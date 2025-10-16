import { useEffect, useState, useRef } from "react";
import RotatingText from "./comps/RotatingText";
import { motion, useScroll, useTransform } from "framer-motion";
import { Search, MapPin, Calendar } from "lucide-react";
import SplashCursor from "./comps/SplashCursor";

const heroImages = [
  "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?auto=compress&cs=tinysrgb&w=1600",
];

export const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { scrollYProgress } = useScroll();
  const heroRef = useRef<HTMLDivElement>(null);

  const y = useTransform(scrollYProgress, [0, 0.3], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* Fluid Simulation constrained to hero */}
      <div className="absolute inset-0 z-10 overflow-hidden">
        <SplashCursor 
          SIM_RESOLUTION={128}
          DYE_RESOLUTION={1440}
          SPLAT_RADIUS={0.15}
          SPLAT_FORCE={4000}
          COLOR_UPDATE_SPEED={8}
          TRANSPARENT={true}
          SHADING={true}
        />
      </div>

      {heroImages.map((img, i) => (
        <motion.div
          key={img}
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: i === activeSlide ? 1 : 0 }}
          transition={{ duration: 1.5 }}
        >
          <img loading='lazy' src={img} alt="Event" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 via-slate-900/60 to-slate-900" />
        </motion.div>
      ))}

      <motion.div
        className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ y, opacity }}
      >
        {/* Rest of your hero content */}
        <motion.h1
          className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Discover Unforgettable Events and Experience
          <RotatingText
            texts={["Memorable Moments", "Exciting Adventures", "Inspiring Stories", "Unforgettable Memories"]}
            mainClassName="px-2 sm:px-3 md:px-5 text-violet-500 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          From intimate concerts to massive festivals, find experiences that
          move you
        </motion.p>

        <motion.div
          className="w-full max-w-4xl bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, artists, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-gray-900 placeholder-gray-500"
              />
            </div>

            <div className="flex gap-4">
              <button className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                <MapPin className="h-5 w-5" />
                <span className="hidden md:inline">Location</span>
              </button>

              <button className="flex items-center gap-2 bg-gray-50 rounded-xl px-4 py-3 text-gray-700 hover:bg-gray-100 transition">
                <Calendar className="h-5 w-5" />
                <span className="hidden md:inline">Date</span>
              </button>

              <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl px-8 py-3 font-semibold hover:from-blue-700 hover:to-cyan-700 transition shadow-lg">
                Search
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="mt-12 flex gap-8 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400">50K+</div>
            <div className="text-gray-300">Events</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-cyan-400">2M+</div>
            <div className="text-gray-300">Attendees</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400">120+</div>
            <div className="text-gray-300">Cities</div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {heroImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveSlide(i)}
            className={`h-2 rounded-full transition-all ${
              i === activeSlide ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
};