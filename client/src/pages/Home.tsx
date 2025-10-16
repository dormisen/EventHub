<<<<<<< HEAD
import { Hero } from '../components/home/Hero';
import { Features } from '../components/home/Features';
import { Categories } from '../components/home/Categories';
import { FeaturedEvents } from '../components/home/FeaturedEvents';
import { TrendingEvents } from '../components/home/TrendingEvents';
import { HowItWorks } from '../components/home/HowItWorks';
import { Testimonials } from '../components/home/Twstimonials';
import { FAQ } from '../components/home/FAQ';
import { Newsletter } from '../components/home/NewSletter';
import ClickSpark from '../components/home/comps/ClickSpark';
import LoadingSpinner from '../components/AD_co/LoadingSpinner';
import { Suspense } from 'react';
const Home = () => {
  return (
    <ClickSpark
      sparkColor='#fff'
      sparkSize={10}
      sparkRadius={15}
      sparkCount={8}
      duration={400}
    >
      <div className="overflow-hidden font-sans bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white">
        <Suspense fallback={<LoadingSpinner />}>
          <Hero />
          <Features />
          <Categories />
          <FeaturedEvents />
          <TrendingEvents />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <Newsletter />
        </Suspense>
      </div>
    </ClickSpark>
=======
import  { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, MapPin, Ticket, Star,} from 'lucide-react';

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  
  // Hero images for carousel
  const heroImages = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622",
    "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3"
  ];

  // Features data
  const features = [
    { 
      icon: Calendar, 
      title: "Smart Discovery", 
      desc: "AI-powered recommendations based on your preferences and past events",
      color: "from-indigo-500 to-purple-600"
    },
    { 
      icon: Ticket, 
      title: "One-Tap Booking", 
      desc: "Secure instant reservations with our encrypted payment system",
      color: "from-teal-500 to-emerald-600"
    },
    { 
      icon: MapPin, 
      title: "Local Experiences", 
      desc: "Curated events in your neighborhood with personalized suggestions",
      color: "from-amber-500 to-orange-600"
    },
    { 
      icon: Users, 
      title: "Event Community", 
      desc: "Connect with fellow attendees before, during and after events",
      color: "from-rose-500 to-pink-600"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      quote: "EventHub helped me discover underground music events I never would have found otherwise!",
      author: "Alex Morgan",
      role: "Music Enthusiast"
    },
    {
      quote: "Booking tickets has never been easier. The whole process takes less than 30 seconds!",
      author: "Jamie Chen",
      role: "Frequent Event Goer"
    },
    {
      quote: "I've met amazing people through the community features. It's more than just event discovery!",
      author: "Taylor Williams",
      role: "Community Member"
    }
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    
    // Hide navbar on mount
    document.body.classList.add('no-navbar');
    
    return () => {
      clearInterval(interval);
      document.body.classList.remove('no-navbar');
    };
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Carousel */}
      <section className="relative h-screen flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
            <img
              src={heroImages[activeSlide]}
              alt="Event background"
              className="w-full h-full object-cover"
              loading="eager"
            />
          </motion.div>
        </AnimatePresence>

        

        {/* Hero Content */}
        <div className="relative container mx-auto px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-3xl text-center md:text-left"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100px' }}
              transition={{ delay: 0.8 }}
              className="hidden md:block h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mb-6 rounded-full"
            />
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Transform Your
              </span><br />
              Event Experience
            </h1>
            
            <p className="text-xl text-gray-200 mb-10 max-w-2xl">
              Discover, book, and enjoy unforgettable experiences curated just for you. Join our community of event enthusiasts.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link
                to="/events"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-700 text-white font-semibold text-lg hover:shadow-xl hover:shadow-indigo-500/20 transition-all duration-300"
              >
                Explore Events
              </Link>
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm text-white font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-all ${activeSlide === index ? 'bg-white w-6' : 'bg-white/30'}`}
              onClick={() => setActiveSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
              <div className="text-indigo-200">Events</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white">2M+</div>
              <div className="text-indigo-200">Attendees</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white">95%</div>
              <div className="text-indigo-200">Satisfaction</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              viewport={{ once: true }}
            >
              <div className="text-3xl md:text-4xl font-bold text-white">120+</div>
              <div className="text-indigo-200">Cities</div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              Why EventHub Stands Out
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-gray-600 dark:text-gray-300"
            >
              We've reimagined event discovery from the ground up
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={{ y: -10 }}
                className={`bg-gradient-to-br ${feature.color} p-1 rounded-2xl shadow-xl`}
              >
                <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${feature.color}`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-black dark:to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              What Our Community Says
            </motion.h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.author}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="h-5 w-5 fill-amber-400 text-amber-400" 
                    />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 italic mb-6 text-lg">
                  "{testimonial.quote}"
                </p>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {testimonial.author}
                  </div>
                  <div className="text-indigo-600 dark:text-indigo-400">
                    {testimonial.role}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-28 bg-gradient-to-r from-indigo-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:40px_40px]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready for Your Next Adventure?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              viewport={{ once: true }}
              className="text-xl text-indigo-200 mb-10 max-w-2xl mx-auto"
            >
              Join millions discovering unforgettable experiences through EventHub
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/register"
                className="px-8 py-4 rounded-xl bg-white text-indigo-900 font-bold text-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Create Free Account
              </Link>
              <Link
                to="/events"
                className="px-8 py-4 rounded-xl bg-transparent text-white font-bold text-lg border-2 border-white hover:bg-white/10 transition-all duration-300"
              >
                Browse Events
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
>>>>>>> a175ee5a7844f8e8b8b1a23e88f06aa8c8538a20
  );
};

export default Home;