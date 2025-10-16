/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getEventDetails } from '../api/Event';
import { ExclamationTriangleIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/24/solid';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import { PaymentMethodSelector } from '../components/TicketSelector';
import { EventType } from '../assets/types';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import LoadingSpinner from '../components/AD_co/LoadingSpinner';
import { useAuth } from '../context/Authcontext';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import L from 'leaflet';
import { PayPalButton } from '../components/PAY/PayPalButton';
import { Helmet } from 'react-helmet';
import debounce from 'lodash.debounce';
import { motion, AnimatePresence } from 'framer-motion';

// Fix leaflet marker icons
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const EventDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const { checkAuthStatus } = useAuth();
  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTickets, setSelectedTickets] = useState<{ [key: string]: number }>({});
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [, setImageLoading] = useState(true);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe || !elements) {
      setError('Payment system is initializing...');
      return;
    }
    setError('');
  }, [stripe, elements]);
  useEffect(() => {
    let isMounted = true;
    const fetchEvent = async () => {
      try {
        const data = await getEventDetails(eventId!);
        const debouncedCheck = debounce(checkAuthStatus, 500, { leading: true, trailing: false });
        await debouncedCheck();
        if (isMounted) setEvent(data);
      } catch (err) {
        if (isMounted) setError('Failed to load event details');
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchEvent();
    return () => { isMounted = false };
  }, [eventId, checkAuthStatus]);

  const handleTicketChange = (ticketId: string, quantity: number) => {
    const ticket = event?.tickets.find(t => t._id === ticketId);
    if (!ticket) return;

    quantity = Math.max(0, quantity); // Allow 0 to remove tickets

    if (quantity > ticket.quantity) {
      setError(`Only ${ticket.quantity} tickets available for ${ticket.name}`);
      return;
    }

    if (quantity === 0) {
      const newSelected = { ...selectedTickets };
      delete newSelected[ticketId];
      setSelectedTickets(newSelected);
    } else {
      setSelectedTickets(prev => ({ ...prev, [ticketId]: quantity }));
    }
    setError('');
  };

  const calculateTotal = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketId, quantity]) => {
      const ticket = event?.tickets.find(t => t._id === ticketId);
      return total + (ticket?.price || 0) * quantity;
    }, 0);
  };

  const totalTickets = Object.values(selectedTickets).reduce((sum, qty) => sum + qty, 0);


  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: event?.title,
          text: event?.description,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center gap-6"
      >
        <LoadingSpinner size="large" />
        <div className="text-center">
          <p className="text-gray-600 text-lg font-medium">Loading event details...</p>
          <p className="text-gray-400 text-sm">Getting everything ready for you</p>
        </div>
      </motion.div>
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-gradient-to-br from-gray-50 to-red-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-md"
      >
        <ExclamationTriangleIcon className="w-20 h-20 text-red-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
        <p className="text-gray-600 mb-8 text-lg">{error}</p>
        <div className="flex gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.reload()}
            className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            Try Again
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/events')}
            className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
          >
            Browse Events
          </motion.button>
        </div>
      </motion.div>
    </div>
  );

  if (!event) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Helmet>
        <title>{event.title} | EventHub</title>
        <meta name="description" content={event.description} />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-3 text-gray-600 hover:text-purple-600 transition-colors group mb-8"
        >
          <div className="w-10 h-10 bg-white rounded-xl shadow-lg flex items-center justify-center group-hover:shadow-xl transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </div>
          <span className="font-medium">Back to Events</span>
        </motion.button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {/* Event Header */}
              <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex-1">
                    <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {event.title}
                    </h1>
                    
                    {/* Organization Name */}
                    {event.organizer?.organizerInfo?.organizationName && (
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {(event.organizer.organizerInfo.organizationName || '').charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm">Organized by</p>
                          <p className="text-gray-900 font-semibold text-lg">
                            {event.organizer.organizerInfo.organizationName}
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <CalendarIcon className="w-6 h-6 text-purple-600" />
                        <div>
                          <p className="text-sm text-gray-600">Date & Time</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(event.date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-gray-50 px-4 py-3 rounded-xl border border-gray-200">
                        <MapPinIcon className="w-6 h-6 text-blue-600" />
                        <div>
                          <p className="text-sm text-gray-600">Location</p>
                          <p className="font-semibold text-gray-900">{event.location}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3 ml-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsFavorite(!isFavorite)}
                      className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      {isFavorite ? (
                        <HeartSolid className="w-6 h-6 text-red-500" />
                      ) : (
                        <HeartIcon className="w-6 h-6 text-gray-400" />
                      )}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="w-12 h-12 bg-white border border-gray-200 rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                    >
                      <ShareIcon className="w-6 h-6 text-gray-400" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Media Carousel */}
              {event.media && event.media.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8 rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Carousel
                    showArrows={true}
                    showThumbs={event.media.length > 1}
                    showStatus={false}
                    infiniteLoop={true}
                    className="event-carousel"
                  >
                    {event.media.map((mediaUrl, index) => (
                      <div key={index} className="h-96 lg:h-[500px] relative">
                        <img
                          src={mediaUrl}
                          alt={`Event media ${index + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          onLoad={() => setImageLoading(false)}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
                          <p className="text-white text-sm text-right font-medium">
                            Photo {index + 1} of {event.media?.length ?? 0}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </motion.div>
              ) : (
                <div className="mb-8 rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80"
                    alt="Default event"
                    className="w-full h-96 lg:h-[500px] object-cover"
                  />
                </div>
              )}

              {/* Event Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 mb-8 border border-gray-100"
              >
                <h3 className="text-2xl font-bold mb-6 text-gray-900">About the Event</h3>
                <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-line">
                  {event.description}
                </p>
              </motion.div>

              {/* Map Section */}
              {event.cordinates && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
                >
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Event Location</h3>
                  <div className="flex items-center gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                    <MapPinIcon className="w-8 h-8 text-purple-600 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">{event.location}</p>
                      <p className="text-gray-600">Exact location details provided after ticket purchase</p>
                    </div>
                  </div>
                  <div className="h-96 rounded-xl overflow-hidden shadow-lg relative">
                    <MapContainer
                      center={[event.cordinates.lat, event.cordinates.lng]}
                      zoom={15}
                      className="h-full w-full"
                      scrollWheelZoom={true}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      <Marker position={[event.cordinates.lat, event.cordinates.lng]}>
                        <Popup className="text-sm font-medium">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-5 h-5 text-purple-600" />
                            {event.location}
                          </div>
                        </Popup>
                      </Marker>
                    </MapContainer>
                    <div className="absolute top-4 right-4 z-[1000] bg-white p-3 rounded-xl shadow-lg">
                      <p className="text-sm font-medium text-gray-900">Coordinates</p>
                      <p className="text-xs text-gray-600">
                        {event.cordinates.lat.toFixed(4)}, {event.cordinates.lng.toFixed(4)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

          {/* Ticket Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="sticky top-8 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white">
                <h3 className="text-2xl font-bold mb-2">Get Your Tickets</h3>
                <p className="text-purple-100">Secure your spot at this amazing event</p>
              </div>

              <div className="p-6">
                {/* Tickets List */}
                <div className="space-y-4 mb-6">
                  {event.tickets?.map(ticket => (
                    <motion.div
                      key={ticket._id}
                      whileHover={{ scale: 1.02 }}
                      className="p-4 border-2 border-gray-100 rounded-xl hover:border-purple-200 transition-all bg-white shadow-sm hover:shadow-md"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 text-lg">{ticket.name}</h4>
                          <p className="text-2xl font-bold text-purple-600 mb-2">${ticket.price.toFixed(2)}</p>
                          <p className={`text-sm font-medium ${
                            ticket.quantity > 0 ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {ticket.quantity > 0 
                              ? `${ticket.quantity} tickets remaining` 
                              : 'Sold out'
                            }
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleTicketChange(ticket._id, (selectedTickets[ticket._id] || 0) - 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors disabled:opacity-30 flex items-center justify-center"
                            disabled={(selectedTickets[ticket._id] || 0) <= 0}
                          >
                            -
                          </motion.button>
                          <span className="w-8 text-center text-lg font-bold text-gray-900">
                            {selectedTickets[ticket._id] || 0}
                          </span>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleTicketChange(ticket._id, (selectedTickets[ticket._id] || 0) + 1)}
                            className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200 hover:bg-gray-200 transition-colors disabled:opacity-30 flex items-center justify-center"
                            disabled={(selectedTickets[ticket._id] || 0) >= ticket.quantity}
                          >
                            +
                          </motion.button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-600">Total</p>
                          <p className="text-lg font-bold text-gray-900">
                            ${((selectedTickets[ticket._id] || 0) * ticket.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Total and Payment */}
                {totalTickets > 0 && (
                  <AnimatePresence>
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t pt-6"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-gray-600">Total tickets</p>
                          <p className="text-2xl font-bold text-gray-900">{totalTickets}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-600">Total amount</p>
                          <p className="text-3xl font-bold text-purple-600">${calculateTotal().toFixed(2)}</p>
                        </div>
                      </div>

                      <PaymentMethodSelector onMethodSelect={() => setShowPaymentForm(true)} />
                      
                      {showPaymentForm && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mt-4"
                        >
                          {paymentProcessing ? (
                            <div className="text-center py-4">
                              <LoadingSpinner size="small" />
                              <p className="text-sm text-gray-600 mt-2">Processing payment...</p>
                            </div>
                          ) : (
                            <PayPalButton
                              eventId={event._id}
                              tickets={Object.entries(selectedTickets).map(([id, quantity]) => ({ id, quantity }))}
                              onSuccess={async () => {
                                setPaymentProcessing(false);
                                navigate('/payment-success');
                              }}
                              onError={(err) => {
                                const message = (err && err.message) ? err.message : 'Payment failed. Please try again.';
                                setError(message);
                                setPaymentProcessing(false);
                              }}
                            />
                          )}
                        </motion.div>
                      )}
                    </motion.div>
                  </AnimatePresence>
                )}

                {totalTickets === 0 && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">Select tickets to continue</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Icon Components
const CalendarIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
  </svg>
);

const MapPinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
  </svg>
);

export default EventDetails;