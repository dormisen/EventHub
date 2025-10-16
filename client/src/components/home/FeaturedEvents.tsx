import { motion } from 'framer-motion';
import { Calendar, MapPin, Ticket, Heart } from 'lucide-react';
import { useState } from 'react';

const events = [
  {
    id: 1,
    title: 'Summer Music Festival 2025',
    date: 'July 20-22, 2025',
    location: 'Central Park, New York',
    price: 'From $89',
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Music',
  },
  {
    id: 2,
    title: 'Tech Summit 2025',
    date: 'August 12-14, 2025',
    location: 'Convention Center, SF',
    price: 'From $299',
    image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Tech',
  },
  {
    id: 3,
    title: 'International Food Carnival',
    date: 'September 5-7, 2025',
    location: 'Downtown Plaza, Miami',
    price: 'From $45',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Food',
  },
  {
    id: 4,
    title: 'Art & Design Expo',
    date: 'October 10-12, 2025',
    location: 'Gallery District, LA',
    price: 'From $35',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Arts',
  },
];

export const FeaturedEvents = () => {
  const [savedEvents, setSavedEvents] = useState<number[]>([]);

  const toggleSave = (id: number) => {
    setSavedEvents(prev =>
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-center justify-between mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              Featured Events
            </h2>
            <p className="text-gray-400 text-lg">
              Handpicked experiences you won't want to miss
            </p>
          </div>
          <button className="hidden md:block text-blue-400 hover:text-blue-300 transition font-semibold">
            View All →
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              className="group bg-slate-800/50 rounded-2xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                loading='lazy'
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => toggleSave(event.id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        savedEvents.includes(event.id)
                          ? 'fill-red-500 text-red-500'
                          : 'text-gray-700'
                      }`}
                    />
                  </button>
                </div>
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full">
                    {event.category}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2 group-hover:text-blue-400 transition">
                  {event.title}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400 text-sm">
                    <MapPin className="h-4 w-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="text-lg font-bold text-blue-400">
                    {event.price}
                  </div>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition font-semibold">
                    <Ticket className="h-4 w-4" />
                    Book Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
