import { motion } from 'framer-motion';
import { Mail, Send } from 'lucide-react';
import { useState } from 'react';

export const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStatus('success');
      setTimeout(() => {
        setEmail('');
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.1] bg-[size:30px_30px]" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full mb-6">
            <Mail className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Never Miss an Event
          </h2>
          <p className="text-xl text-blue-50 mb-8">
            Subscribe to get curated event picks, exclusive deals, and early access to trending experiences
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
            <div className="flex-1 relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/50 transition"
              />
            </div>
            <motion.button
              type="submit"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {status === 'success' ? (
                <>
                  <span>Subscribed!</span>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl"
                  >
                    ✓
                  </motion.span>
                </>
              ) : (
                <>
                  <span>Subscribe</span>
                  <Send className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>

          <p className="text-sm text-blue-100 mt-4">
            Join 50,000+ event enthusiasts. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
