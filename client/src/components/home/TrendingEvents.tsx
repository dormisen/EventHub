import { motion } from 'framer-motion';
import { TrendingUp, Users } from 'lucide-react';

const trending = [
  {
    id: 1,
    title: 'Indie Night Live',
    location: 'Brooklyn, NY',
    date: 'Oct 10',
    attendees: '2.3K',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 2,
    title: 'Startup Pitch Day',
    location: 'Silicon Valley, CA',
    date: 'Nov 2',
    attendees: '1.8K',
    image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 3,
    title: 'City Marathon 2025',
    location: 'Boston, MA',
    date: 'Dec 1',
    attendees: '5.2K',
    image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 4,
    title: 'Culinary Excellence Week',
    location: 'Austin, TX',
    date: 'Nov 18',
    attendees: '3.1K',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 5,
    title: 'Jazz Under the Stars',
    location: 'New Orleans, LA',
    date: 'Oct 25',
    attendees: '1.5K',
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: 6,
    title: 'Digital Art Showcase',
    location: 'Seattle, WA',
    date: 'Nov 8',
    attendees: '950',
    image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export const TrendingEvents = () => {
  return (
    <section className="py-24 bg-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="flex items-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <div>
            <h2 className="text-4xl md:text-5xl font-bold">
              Trending Now
            </h2>
            <p className="text-gray-400 text-lg mt-1">
              Events everyone's talking about
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trending.map((event, index) => (
            <motion.div
              key={event.id}
              className="group relative overflow-hidden rounded-2xl cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="aspect-[16/9] relative overflow-hidden">
                <img
                loading='lazy'
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-bold mb-1">{event.title}</h3>
                      <p className="text-gray-300 text-sm">{event.location}</p>
                    </div>
                    <div className="bg-orange-500 px-3 py-1 rounded-full text-sm font-semibold">
                      {event.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
