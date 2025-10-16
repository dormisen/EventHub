import { format, isValid } from 'date-fns';
import { EventType } from '../assets/types';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import { 
  FiMapPin, 
  FiCalendar, 
  FiInfo, 
  FiHeart, 
  FiShare2, 
  FiUsers,
  FiClock,
  FiTag
} from 'react-icons/fi';
import { motion, easeInOut } from 'framer-motion';
=======
import { FiMapPin, FiCalendar, FiInfo, FiHeart, FiShare2 } from 'react-icons/fi';
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
import LazyLoad from 'react-lazyload';

const defaultImages = [
  'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1621609764095-b32bbe3792f1?auto=format&fit=crop&w=800&q=80',
<<<<<<< HEAD
  'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1514525253160-7e3202118098?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1541250628459-d8e1fdde1457?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
=======
// Concert/音乐节
  'https://images.unsplash.com/photo-1464375117522-1311d6a5b81f?auto=format&fit=crop&w=800&q=80',
  
  // Conference/会议
  'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
  
  // Party/派对
  'https://images.unsplash.com/photo-1514525253160-7e3202118098?auto=format&fit=crop&w=800&q=80',
  
  // Sports/体育
  'https://images.unsplash.com/photo-1541250628459-d8e1fdde1457?auto=format&fit=crop&w=800&q=80',
  
  // Festival/节日
  'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
  
  // Theater/剧院
  'https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?auto=format&fit=crop&w=800&q=80',
  
  // Food Event/美食活动
  'https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=800&q=80',
  
  // Art Exhibition/艺术展
  'https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=800&q=80',
  
  // Networking/社交活动
  'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=800&q=80',
  
  // Outdoor Adventure/户外活动
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  'https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=800&q=80'
];

interface EventCardProps {
  event: EventType;
  variant?: 'user' | 'organizer';
  onDelete?: (eventId: string) => Promise<void>;
<<<<<<< HEAD
  actions?: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    variant: string;
  }[];
}

export default function EventCard({ event, variant = 'user', actions }: EventCardProps) {
  const navigate = useNavigate();
  const imageUrl = event.image || defaultImages[Math.floor(Math.random() * defaultImages.length)];
  
  const formatDate = (dateString: string) => {
=======
}

export default function EventCard({ event, variant = 'user' }: EventCardProps) {
  const navigate = useNavigate();
  const imageUrl = event.image || defaultImages[Math.floor(Math.random() * defaultImages.length)];
const formatDate = (dateString: string) => {
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
    const date = new Date(dateString);
    return isValid(date) 
      ? format(date, 'MMM do, yyyy - h:mm a')
      : 'Date not available';
  };
<<<<<<< HEAD

  const getTimeUntilEvent = (dateString: string) => {
    const eventDate = new Date(dateString);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Past event';
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    if (diffDays < 7) return `In ${diffDays} days`;
    if (diffDays < 30) return `In ${Math.ceil(diffDays / 7)} weeks`;
    return `In ${Math.ceil(diffDays / 30)} months`;
  };

  const isEventSoon = () => {
    const eventDate = new Date(event.date);
    const now = new Date();
    const diffTime = eventDate.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const cardVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: 1.02, 
      y: -8,
      transition: { duration: 0.3, ease: easeInOut } // use imported easeInOut
    }
  };

  const imageVariants = {
    hover: { scale: 1.1 }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      className="relative group rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-gray-100 cursor-pointer"
      onClick={() => navigate(`/event/${event._id}`)}
    >
      {/* Image Section */}
      <div className="relative aspect-video overflow-hidden">
        <LazyLoad height={200} offset={100}>
          <motion.img 
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover"
            variants={imageVariants}
            transition={{ duration: 0.4 }}
            loading="lazy"
          />
        </LazyLoad>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent" />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {variant === 'organizer' && (
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-purple-700 text-xs font-semibold rounded-full shadow-sm">
              Your Event
            </span>
          )}
          {isEventSoon() && (
            <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full shadow-sm">
              Soon
            </span>
          )}
          {event.category && (
            <span className="px-3 py-1 bg-white/90 backdrop-blur text-gray-700 text-xs font-semibold rounded-full shadow-sm flex items-center gap-1">
              <FiTag className="w-3 h-3" />
              {event.category}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 backdrop-blur-sm bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Add to favorites logic
            }}
          >
            <FiHeart className="w-4 h-4 text-white" />
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 backdrop-blur-sm bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Share logic
            }}
          >
            <FiShare2 className="w-4 h-4 text-white" />
          </motion.button>
        </div>

        {/* Event Info Overlay */}
        <div className="absolute bottom-3 left-3 right-3">
          <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 drop-shadow-lg">
            {event.title}
          </h3>
          <div className="flex items-center gap-2 text-white/90 text-sm">
            <FiClock className="w-3 h-3" />
            <span>{getTimeUntilEvent(event.date)}</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Date and Location */}
        <div className="flex flex-col gap-3 mb-4">
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiCalendar className="w-4 h-4 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{formatDate(event.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 text-gray-600">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <FiMapPin className="w-4 h-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 line-clamp-1">{event.location}</p>
              {event.organizer?.organizerInfo?.organizationName && (
                <p className="text-xs text-gray-500 mt-1">
                  by {event.organizer.organizerInfo.organizationName}
                </p>
              )}
=======
  return (
    <div className="relative group rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 ease-out bg-white">
      <div className="relative aspect-video overflow-hidden">
        <LazyLoad height={200} offset={100}>
          <img 
            src={imageUrl}
            alt={event.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </LazyLoad>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
        
        <div className="absolute top-3 right-3 flex gap-2">
          <button className="p-2 backdrop-blur-sm bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <FiHeart className="w-5 h-5 text-white" />
          </button>
          <button className="p-2 backdrop-blur-sm bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <FiShare2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <h3 
            className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors cursor-pointer"
            onClick={() => navigate(`/event/${event._id}`)}
          >
            {event.title}
          </h3>
          
          <div className="flex flex-col gap-2 text-gray-600">
            <div className="flex items-center gap-2">
              <FiCalendar className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="text-sm">
                 {formatDate(event.date)} 
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FiMapPin className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="text-sm line-clamp-1">{event.location}</span>
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Description */}
        {event.description && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <div className="w-6 h-6 bg-green-100 rounded-lg flex items-center justify-center">
                <FiInfo className="w-3 h-3 text-green-600" />
              </div>
              <span className="text-sm font-medium">About</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
=======
        {event.description && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-gray-600 mb-2">
              <FiInfo className="w-4 h-4 text-indigo-600 flex-shrink-0" />
              <span className="text-sm font-medium">Description</span>
            </div>
            <p className="text-gray-600 text-sm line-clamp-3">
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
              {event.description}
            </p>
          </div>
        )}

<<<<<<< HEAD
        {/* Tickets and Actions */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
          {event.tickets?.length > 0 ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-purple-600 to-blue-500 text-white text-sm font-semibold rounded-full shadow-sm">
                  ${Math.min(...event.tickets.map(t => t.price))}+
                </span>
                <span className="text-xs text-gray-500 flex items-center gap-1">
                  <FiUsers className="w-3 h-3" />
                  {event.tickets.length} option{event.tickets.length > 1 ? 's' : ''}
                </span>
              </div>
            </div>
          ) : (
            <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm font-medium rounded-full">
              Free Event
            </span>
          )}
          
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/event/${event._id}`);
            }}
            className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-xl hover:from-purple-700 hover:to-blue-600 transition-all duration-200 flex items-center gap-2 text-sm font-semibold shadow-lg hover:shadow-xl"
=======
        <div className="flex items-center justify-between mt-4">
          {event.tickets?.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                ${Math.min(...event.tickets.map(t => t.price))}+
              </span>
              <span className="text-sm text-gray-500">
                {event.tickets.length} ticket option{event.tickets.length > 1 && 's'}
              </span>
            </div>
          )}
          <button 
            onClick={() => navigate(`/event/${event._id}`)}
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-lg hover:from-indigo-700 hover:to-blue-600 transition-all flex items-center gap-2"
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
          >
            <span>View Details</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
<<<<<<< HEAD
          </motion.button>
        </div>

        {/* Custom Actions */}
        {actions && actions.length > 0 && (
          <div className="flex gap-2 mt-4 pt-4 border-t border-gray-100">
            {actions.map((action, index) => (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.stopPropagation();
                  action.onClick();
                }}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  action.variant === 'danger' 
                    ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                    : action.variant === 'outline'
                    ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {action.icon}
                {action.label}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
=======
          </button>
        </div>
      </div>

      {variant === 'organizer' && (
        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-indigo-600 shadow-sm">
          Your Event
        </div>
      )}
    </div>
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  );
}