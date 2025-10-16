 
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { useAuth } from '../context/Authcontext';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Fix leaflet marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface LocationType {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface TicketType {
  name: string;
  price: string;
  quantity: string;
  description: string;
}

interface EventData {
  title: string;
  description: string;
  date: string;
  location: string;
  coordinates: { lat: number; lng: number };
  categories: string[];
  tickets: { name: string; price: number; quantity: number; description: string }[];
  image?: string;
  media?: string[];
}

export default function CreateEvent() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: {
      address: '',
      coordinates: { lat: 0, lng: 0 }
    } as LocationType,
    media: [] as string[],
    tickets: [] as TicketType[],
    category: 'general'
  });

  useEffect(() => {
    if (user && (!user.organizerInfo?.verified || user.role !== 'organizer')) {
      navigate('/register-organization');
    } else if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleImageUpload = async (files: FileList) => {
    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    // Enhanced Cloudinary configuration check
    if (!cloudName || cloudName === 'your_cloudinary_cloud_name') {
      toast.error('Image upload is not configured. Please contact the administrator.');
      return;
    }

    if (!uploadPreset) {
      toast.error('Upload preset is not configured.');
      return;
    }

    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      for (const file of files) {
        // Validate file type and size
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not an image`);
          continue;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
          toast.error(`Image ${file.name} is too large (max 5MB)`);
          continue;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', uploadPreset);
        formData.append('folder', 'event_images'); // Optional: organize in folder

        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            timeout: 30000, // 30 second timeout
          }
        );

        if (res.data.secure_url) {
          uploadedUrls.push(res.data.secure_url);
          toast.success(`Uploaded ${file.name}`);
        }
      }

      if (uploadedUrls.length > 0) {
        setFormData(prev => ({ 
          ...prev, 
          media: [...prev.media, ...uploadedUrls] 
        }));
      }
    } catch (error: any) {
      console.error('Image upload error:', error);
      
      if (error.response) {
        // Cloudinary specific error
        toast.error(`Upload failed: ${error.response.data?.error?.message || 'Unknown error'}`);
      } else if (error.request) {
        toast.error('Upload failed: No response from server. Check your connection.');
      } else {
        toast.error('Upload failed: Please try again.');
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleGeocodeAddress = async () => {
    if (!formData.location.address.trim()) {
      toast.error('Please enter an address first');
      return;
    }

    setIsGeocoding(true);
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(formData.location.address)}`
      );
      
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: { 
              lat: parseFloat(lat), 
              lng: parseFloat(lon) 
            }
          }
        }));
        toast.success('Location found!');
      } else {
        toast.error('Address not found. Please try a different address.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      toast.error('Geocoding service unavailable. Please try again.');
    }
    setIsGeocoding(false);
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        setFormData(prev => ({
          ...prev,
          location: {
            ...prev.location,
            coordinates: { lat: e.latlng.lat, lng: e.latlng.lng }
          }
        }));
      },
    });
    return null;
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      toast.error('Event title is required');
      return false;
    }
    if (!formData.description.trim()) {
      toast.error('Event description is required');
      return false;
    }
    if (!formData.date) {
      toast.error('Event date is required');
      return false;
    }
    
    // Check if date is in the future
    const selectedDate = new Date(formData.date);
    const now = new Date();
    if (selectedDate <= now) {
      toast.error('Event date must be in the future');
      return false;
    }

    if (!formData.location.address.trim()) {
      toast.error('Event location is required');
      return false;
    }
    if (formData.tickets.length === 0) {
      toast.error('At least one ticket type is required');
      return false;
    }

    // Validate tickets
    for (const ticket of formData.tickets) {
      if (!ticket.name.trim()) {
        toast.error('All tickets must have a name');
        return false;
      }
      if (ticket.price === '' || parseFloat(ticket.price) < 0) {
        toast.error('All tickets must have a valid price (0 or higher)');
        return false;
      }
      if (!ticket.quantity || parseInt(ticket.quantity) < 1) {
        toast.error('All tickets must have a quantity of at least 1');
        return false;
      }
    }

    if (!formData.location.coordinates.lat || !formData.location.coordinates.lng) {
      toast.error('Please select a location on the map');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      const eventData: EventData = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        date: new Date(formData.date).toISOString(),
        location: formData.location.address.trim(),
        coordinates: formData.location.coordinates,
        categories: [formData.category],
        tickets: formData.tickets.map(ticket => ({
          name: ticket.name.trim(),
          price: parseFloat(ticket.price) || 0,
          quantity: parseInt(ticket.quantity) || 0,
          description: ticket.description.trim() || `Ticket for ${ticket.name.trim()}`
        }))
      };

      // Use first image as main image, and include all in media array
      if (formData.media.length > 0) {
        eventData.image = formData.media[0];
        eventData.media = formData.media;
      }

      console.log('Submitting event data:', eventData);
      
      const response = await API.post('/events', eventData, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 30000,
      });

      console.log('Event creation response:', response);
      
      toast.success('Event created successfully!');
      navigate('/organizer/dashboard');
    } catch (error: any) {
      console.error('Event creation error:', error);
      
      let errorMessage = 'Failed to create event';
      
      if (error.response) {
        // Server responded with error status
        const serverError = error.response.data;
        errorMessage = serverError?.msg || serverError?.error || serverError?.message || errorMessage;
        
        // Handle specific error cases
        if (error.response.status === 401) {
          errorMessage = 'Authentication failed. Please login again.';
        } else if (error.response.status === 403) {
          errorMessage = 'You do not have permission to create events.';
        } else if (error.response.status === 409) {
          errorMessage = 'An event with similar details already exists.';
        }
      } else if (error.request) {
        // Request made but no response received
        errorMessage = 'Network error. Please check your connection and try again.';
      }
      
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const addFreeTicket = () => {
    setFormData(prev => ({
      ...prev,
      tickets: [...prev.tickets, { 
        name: 'Free Admission', 
        price: '0', 
        quantity: '100', 
        description: 'Complimentary entry' 
      }]
    }));
    toast.success('Free ticket added');
  };

  const addPaidTicket = () => {
    setFormData(prev => ({
      ...prev,
      tickets: [...prev.tickets, { 
        name: '', 
        price: '25.00', 
        quantity: '50', 
        description: '' 
      }]
    }));
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({ 
      ...prev, 
      media: prev.media.filter((_, i) => i !== index) 
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create New Event</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title & Description */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Event Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter event title"
              maxLength={100}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe your event..."
              maxLength={1000}
            />
          </div>
        </div>

        {/* Date & Time */}
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Date & Time <span className="text-red-500">*</span>
            </label>
            <input
              type="datetime-local"
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              min={new Date().toISOString().slice(0, 16)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              required
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="general">General</option>
              <option value="music">Music</option>
              <option value="sports">Sports</option>
              <option value="technology">Technology</option>
              <option value="food">Food & Dining</option>
              <option value="art">Art & Culture</option>
              <option value="business">Business</option>
              <option value="education">Education</option>
              <option value="health">Health & Wellness</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        {/* Location & Map */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Location <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter full address..."
                value={formData.location.address}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  location: { 
                    ...formData.location, 
                    address: e.target.value 
                  } 
                })}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleGeocodeAddress();
                  }
                }}
              />
              <button
                type="button"
                onClick={handleGeocodeAddress}
                disabled={isGeocoding || !formData.location.address.trim()}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {isGeocoding ? 'Searching...' : 'Search'}
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              Enter address and click Search, or click directly on the map
            </p>
          </div>

          <div className="h-96 rounded-lg overflow-hidden border">
            <MapContainer
              center={[formData.location.coordinates.lat || 51.505, formData.location.coordinates.lng || -0.09]}
              zoom={formData.location.coordinates.lat ? 13 : 2}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {formData.location.coordinates.lat !== 0 && (
                <Marker position={[formData.location.coordinates.lat, formData.location.coordinates.lng]} />
              )}
              <MapClickHandler />
            </MapContainer>
          </div>
          
          {formData.location.coordinates.lat !== 0 && (
            <p className="text-sm text-green-600">
              Location selected: {formData.location.coordinates.lat.toFixed(6)}, {formData.location.coordinates.lng.toFixed(6)}
            </p>
          )}
        </div>

        {/* Media Upload */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Event Photos {isUploading && <span className="text-blue-600">(Uploading...)</span>}
          </label>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center px-4 py-6 bg-white text-blue-600 rounded-lg border-2 border-dashed border-blue-400 cursor-pointer hover:border-blue-600 transition-colors">
              <svg className="w-8 h-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm">Drag images or click to upload</span>
              <span className="text-xs text-gray-500 mt-1">Max 5MB per image</span>
              <input
                type="file"
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
                disabled={isUploading}
              />
            </label>
          </div>
          
          {formData.media.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {formData.media.map((url, index) => (
                <div key={index} className="relative group">
                  <img 
                    src={url} 
                    alt={`Event preview ${index + 1}`} 
                    className="h-32 w-full object-cover rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x200?text=Image+Error';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tickets Section */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <label className="block text-sm font-medium text-gray-700">Tickets</label>
              <p className="text-sm text-gray-500">Add ticket types for your event</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={addFreeTicket}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm transition-colors"
              >
                Add Free Ticket
              </button>
              <button
                type="button"
                onClick={addPaidTicket}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 text-sm transition-colors"
              >
                Add Paid Ticket
              </button>
            </div>
          </div>

          {formData.tickets.map((ticket, index) => (
            <div key={index} className="p-4 border rounded-lg space-y-4 bg-gray-50">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">
                  Ticket Type #{index + 1} 
                  {ticket.price === '0' && (
                    <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Free
                    </span>
                  )}
                </h4>
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({
                    ...prev,
                    tickets: prev.tickets.filter((_, i) => i !== index)
                  }))}
                  className="text-red-600 hover:text-red-800 text-sm transition-colors"
                >
                  Remove
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Ticket Name *</label>
                  <input
                    type="text"
                    placeholder="e.g., General Admission, VIP, Early Bird"
                    value={ticket.name}
                    onChange={e => {
                      const newTickets = [...formData.tickets];
                      newTickets[index] = { ...ticket, name: e.target.value };
                      setFormData({ ...formData, tickets: newTickets });
                    }}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Price ($) *</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    value={ticket.price}
                    onChange={e => {
                      const newTickets = [...formData.tickets];
                      newTickets[index] = { ...ticket, price: e.target.value };
                      setFormData({ ...formData, tickets: newTickets });
                    }}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                  {ticket.price === '0' && (
                    <p className="text-xs text-green-600 mt-1">This is a free ticket</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Quantity *</label>
                  <input
                    type="number"
                    placeholder="100"
                    min="1"
                    value={ticket.quantity}
                    onChange={e => {
                      const newTickets = [...formData.tickets];
                      newTickets[index] = { ...ticket, quantity: e.target.value };
                      setFormData({ ...formData, tickets: newTickets });
                    }}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-gray-700">Description</label>
                  <input
                    type="text"
                    placeholder="What's included in this ticket?"
                    value={ticket.description}
                    onChange={e => {
                      const newTickets = [...formData.tickets];
                      newTickets[index] = { ...ticket, description: e.target.value };
                      setFormData({ ...formData, tickets: newTickets });
                    }}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}

          {formData.tickets.length === 0 && (
            <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No tickets added</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by adding your first ticket type.</p>
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isUploading}
          className="w-full py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium"
        >
          {isSubmitting ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}