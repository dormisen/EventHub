import { motion } from 'framer-motion';
import { Music, Laptop, Dumbbell, Utensils, Briefcase, Palette, Film, Heart } from 'lucide-react';
import PixelTransition from './comps/PixelTransition'; 

const categories = [
  { name: 'Music & Concerts', icon: Music, color: 'from-blue-500 to-cyan-500', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Tech & Innovation', icon: Laptop, color: 'from-emerald-500 to-teal-500', image: 'https://images.pexels.com/photos/2608517/pexels-photo-2608517.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Sports & Fitness', icon: Dumbbell, color: 'from-orange-500 to-amber-500', image: 'https://images.pexels.com/photos/209977/pexels-photo-209977.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Food & Drink', icon: Utensils, color: 'from-pink-500 to-rose-500', image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Business & Career', icon: Briefcase, color: 'from-violet-500 to-purple-500', image: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Arts & Culture', icon: Palette, color: 'from-sky-500 to-blue-500', image: 'https://images.pexels.com/photos/1839919/pexels-photo-1839919.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Film & Media', icon: Film, color: 'from-red-500 to-orange-500', image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=600' },
  { name: 'Community & Social', icon: Heart, color: 'from-teal-500 to-emerald-500', image: 'https://images.pexels.com/photos/1157557/pexels-photo-1157557.jpeg?auto=compress&cs=tinysrgb&w=600' },
];

export const Categories = () => {
  return (
    <section className="py-24 bg-slate-800 relative">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Explore by Category
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Find your passion among thousands of events
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <PixelTransition
                firstContent={
                  <div className="relative w-full h-full">
                    <img
                      loading='lazy'
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} mb-3`}>
                        <category.icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm md:text-base text-white">{category.name}</h3>
                    </div>
                  </div>
                }
                secondContent={
                  <div className={`w-full h-full flex flex-col items-center justify-center p-4 text-center bg-gradient-to-br ${category.color}`}>
                    <div className="p-3 rounded-xl bg-white/20 backdrop-blur-sm mb-3">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-lg md:text-xl text-white mb-2">{category.name}</h3>
                    <p className="text-white/90 text-sm">Explore events</p>
                  </div>
                }
                gridSize={8}
                pixelColor="#ffffff"
                animationStepDuration={0.3}
                className="rounded-2xl overflow-hidden aspect-square"
                aspectRatio="100%"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};