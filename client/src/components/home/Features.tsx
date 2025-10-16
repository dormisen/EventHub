import { motion } from 'framer-motion';
import { Calendar, Ticket, MapPin, Users, Shield, Zap } from 'lucide-react';
import { useRef, useState } from 'react';
import ClickSpark from './comps/ClickSpark'
const features = [
  {
    icon: Calendar,
    title: 'Smart Discovery',
    description: 'AI-powered recommendations tailored to your taste and location',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Ticket,
    title: 'Instant Booking',
    description: 'Secure your spot in seconds with our streamlined checkout',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: MapPin,
    title: 'Local & Global',
    description: 'Discover events in your neighborhood or around the world',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Users,
    title: 'Social Experience',
    description: 'Connect with fellow attendees and build lasting memories',
    color: 'from-pink-500 to-rose-500',
  },
  {
    icon: Shield,
    title: 'Secure Payments',
    description: 'Bank-level encryption for all transactions and data',
    color: 'from-violet-500 to-purple-500',
  },
  {
    icon: Zap,
    title: 'Real-Time Updates',
    description: 'Get instant notifications about your events and changes',
    color: 'from-sky-500 to-blue-500',
  },
];

import { ReactNode } from 'react';

interface GlareCardProps {
  children: ReactNode;
  className?: string;
  gradientColor?: string;
}

const GlareCard = ({ children, className = '', gradientColor = 'rgba(255,255,255,0.15)' }: GlareCardProps) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (!cardRef.current) return;
    
    const rect = (cardRef.current as HTMLDivElement).getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setMousePosition({ x, y });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-slate-800/50 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Enhanced Glare Effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, ${gradientColor} 0%, transparent 50%)`,
          mixBlendMode: 'overlay',
        }}
      />
      
      {/* Subtle shine effect */}
      <div
        className={`absolute inset-0 transition-opacity duration-500 ${
          isHovered ? 'opacity-30' : 'opacity-0'
        }`}
        style={{
          background: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%)`,
          transform: `translateX(${mousePosition.x - 100}%) translateY(${mousePosition.y - 100}%)`,
        }}
      />
    </div>
  );
};

export const Features = () => {
  return (
        <ClickSpark
          sparkColor='#fff'
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose EventHub
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to discover, book, and enjoy amazing events
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 rounded-2xl" />
              
              <GlareCard className="p-8 h-full cursor-pointer">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>

                <h3 className="text-xl font-semibold mb-3 group-hover:text-white transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {feature.description}
                </p>
              </GlareCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
      </ClickSpark>
  );
};