import express from 'express';
import Event from '../models/Event.js';
import User from '../models/User.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const defaultImages = [
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800',
  'https://images.unsplash.com/photo-1621609764095-b32bbe3792f1?auto=format&fit=crop&w=800'
];

const router = express.Router();

const verifyOrganizer = async (req, res, next) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json({ msg: "Unauthorized" });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user || user.role !== 'organizer') {
      return res.status(403).json({ msg: "Organizer access required" });
    }
    
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ msg: "Invalid token" });
  }
};

// POST /events route
router.post('/', verifyOrganizer, async (req, res) => {
  try {
    console.log('Received event data:', req.body);
    
    const { title, description, date, location, tickets, categories } = req.body;
    if (!title || !description || !date || !location) {
      return res.status(400).json({ 
        error: 'Missing required fields: title, description, date, and location are required' 
      });
    }

    if (!tickets || !Array.isArray(tickets) || tickets.length === 0) {
      return res.status(400).json({ 
        error: 'At least one ticket type is required' 
      });
    }

    // Validate tickets
    for (const ticket of tickets) {
      if (!ticket.name || !ticket.name.trim()) {
        return res.status(400).json({ error: 'All tickets must have a name' });
      }
      if (ticket.price === undefined || ticket.price === null) {
        return res.status(400).json({ error: 'All tickets must have a price' });
      }
      if (ticket.quantity === undefined || ticket.quantity === null || ticket.quantity < 0) {
        return res.status(400).json({ error: 'All tickets must have a valid quantity' });
      }
    }

    const eventData = {
      ...req.body,
      organizer: req.user._id,
      categories: categories || ['general'],
      tickets: tickets.map(ticket => ({
        name: ticket.name.trim(),
        price: parseFloat(ticket.price) || 0, // Allow free tickets (price = 0)
        quantity: parseInt(ticket.quantity) || 0,
        description: ticket.description || ''
      }))
    };
    
    if (req.body.image && req.body.image.trim() !== "") {
      eventData.image = req.body.image;
    }

    console.log('Creating event with data:', eventData);
    const event = new Event(eventData);
    await event.save();
    
    // Populate organizer info for response
    await event.populate('organizer', 'name organizerInfo.organizationName');
    
    res.status(201).json(event);
  } catch (error) {
    console.error('Event creation error:', error);
    res.status(400).json({ 
      error: error.message || 'Failed to create event',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Get public events - FIXED VERSION WITH FREE EVENTS SUPPORT
router.get('/public/events', async (req, res) => {
  try {
    const { 
      page = 1, 
      search = '', 
      upcomingOnly = 'false',
      category = '',
      date = '',
      sort = 'date-asc',
      minPrice,
      maxPrice,
      location = '',
      freeOnly = 'false'
    } = req.query;
    
    const pageSize = 12;
    const skip = (page - 1) * pageSize;
    
    const query = {};
    
    console.log('Query parameters:', {
      page, search, upcomingOnly, category, date, sort, minPrice, maxPrice, location, freeOnly
    });

    // Search filter
    if (search && search.trim() !== '') {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Location filter
    if (location && location.trim() !== '') {
      query.location = { $regex: location, $options: 'i' };
    }
    
    // Upcoming events filter
    if (upcomingOnly === 'true') {
      query.date = { $gte: new Date() };
    }
    
    // Category filter
    if (category && category.trim() !== '') {
      query.categories = { $in: [new RegExp(category, 'i')] };
    }
    
    // Date filter (specific date)
    if (date && date.trim() !== '') {
      try {
        const startDate = new Date(date);
        const endDate = new Date(date);
        endDate.setDate(endDate.getDate() + 1);
        query.date = {
          $gte: startDate,
          $lt: endDate
        };
      } catch (error) {
        console.log('Invalid date format:', date);
      }
    }
    
    // Price filtering with free events support
    if (freeOnly === 'true') {
      // Only show events with at least one free ticket
      query['tickets.price'] = { $eq: 0 };
    } else if (minPrice !== undefined || maxPrice !== undefined) {
      query['tickets.price'] = {};
      if (minPrice !== undefined) {
        query['tickets.price'].$gte = parseFloat(minPrice);
      }
      if (maxPrice !== undefined && maxPrice !== '0') {
        query['tickets.price'].$lte = parseFloat(maxPrice);
      }
    }
    
    // Sort options
    let sortOptions = {};
    switch (sort) {
      case 'date-desc':
        sortOptions = { date: -1 };
        break;
      case 'title-asc':
        sortOptions = { title: 1 };
        break;
      case 'title-desc':
        sortOptions = { title: -1 };
        break;
      case 'price-asc':
        sortOptions = { 'tickets.price': 1 };
        break;
      case 'price-desc':
        sortOptions = { 'tickets.price': -1 };
        break;
      case 'date-asc':
      default:
        sortOptions = { date: 1 };
        break;
    }

    console.log('Final query:', JSON.stringify(query));

    const [events, total] = await Promise.all([
      Event.find(query)
        .populate('organizer', 'name organizerInfo.organizationName')
        .sort(sortOptions)
        .skip(skip)
        .limit(pageSize)
        .select('-attendees'),
      Event.countDocuments(query)
    ]);

    console.log(`Found ${events.length} events out of ${total} total`);

    // Enhance events with free ticket info
    const enhancedEvents = events.map(event => ({
      ...event.toObject(),
      hasFreeTickets: event.tickets.some(ticket => ticket.price === 0),
      minPrice: Math.min(...event.tickets.map(t => t.price)),
      maxPrice: Math.max(...event.tickets.map(t => t.price))
    }));

    res.json({
      events: enhancedEvents,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / pageSize),
      hasMore: parseInt(page) < Math.ceil(total / pageSize)
    });
  } catch (error) {
    console.error("Get Public Events Error:", error);
    res.status(500).json({ 
      msg: 'Failed to get events',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Get all events for logged-in organizer
router.get('/', verifyOrganizer, async (req, res) => {
  try {
    const events = await Event.find({ organizer: req.user._id })
      .populate('organizer', 'name')
      .sort({ date: 1 })
      .select('-attendees.paymentDetails');

    res.json(events);
  } catch (error) {
    console.error("Get Events Error:", error.message);
    res.status(500).json({ 
      msg: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Server error' 
    });
  }
});

// Get single event details
router.get('/event/:eventId', async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId)
      .populate({
        path: 'organizer',
        select: 'name email organizerInfo.organizationName organizerInfo.stripeAccountId organizerInfo.stripeAccountStatus'
      });

    if (!event) return res.status(404).json({ error: 'Event not found' });
    
    // Enhance with free ticket info
    const enhancedEvent = {
      ...event.toObject(),
      hasFreeTickets: event.tickets.some(ticket => ticket.price === 0),
      minPrice: Math.min(...event.tickets.map(t => t.price)),
      maxPrice: Math.max(...event.tickets.map(t => t.price))
    };
    
    res.json(enhancedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get event attendees (organizer only)
router.get('/event/:eventId/attendees', verifyOrganizer, async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.eventId)) {
      return res.status(400).json({ msg: "Invalid event ID" });
    }

    const event = await Event.findById(req.params.eventId)
      .select('attendees')
      .populate('attendees.user', 'name email');

    if (!event) return res.status(404).json({ msg: "Event not found" });
    
    if (event.organizer.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(event.attendees);
  } catch (error) {
    console.error("Get Attendees Error:", error.message);
    res.status(500).json({ 
      msg: process.env.NODE_ENV === 'development' 
        ? error.message 
        : 'Failed to get attendees' 
    });
  }
});

// Delete event
router.delete('/event/:eventId', verifyOrganizer, async (req, res) => {
  try {
    const event = await Event.findOneAndDelete({ 
      _id: req.params.eventId,
      organizer: req.user._id 
    });
    
    if (!event) return res.status(404).json({ msg: "Event not found" });
    
    res.json({ msg: "Event deleted successfully" });
  } catch (error) {
    res.status(500).json({ msg: 'Failed to delete event' });
  }
});

export default router;