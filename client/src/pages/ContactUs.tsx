import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';

const ContactUs = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-6xl mx-auto px-4 py-16"
    >
      <div className="text-center mb-16">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold mb-4"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
        >
          <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </span>
        </motion.h1>
        <motion.p 
          className="text-xl text-gray-600 max-w-2xl mx-auto"
          initial={{ y: -10 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Have questions? We'd love to hear from you.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Send us a message</h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 mb-2">Your Name</label>
              <input 
                type="text" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Email Address</label>
              <input 
                type="email" 
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2">Message</label>
              <textarea 
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="Your message here..."
              />
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              Send Message
            </motion.button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-8"
        >
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl p-8 text-white shadow-xl">
            <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              {[
                { icon: Mail, text: 'support@eventhub.com' },
                { icon: Phone, text: '+1 (555) 123-4567' },
                { icon: MapPin, text: '123 Event Street, San Francisco, CA 94107' }
              ].map((item, i) => (
                <div key={i} className="flex items-start">
                  <div className="mt-1 mr-4 p-2 bg-white/20 rounded-full">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <p className="text-lg">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white rounded-3xl p-8 shadow-xl">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">Frequently Asked Questions</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-800">How quickly do you respond?</h4>
                <p className="text-gray-600 mt-2">
                  We typically reply within 1 business day. For urgent billing or access
                  issues, include “URGENT” in the subject line.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-4">
                <h4 className="font-semibold text-gray-800">Do you offer phone support?</h4>
                <p className="text-gray-600 mt-2">
                  Email is the fastest way to reach us. For enterprise plans, we provide
                  a dedicated phone line and Slack channel.
                </p>
              </div>
              <div className="border-b border-gray-200 pb-0">
                <h4 className="font-semibold text-gray-800">Where can I report a bug?</h4>
                <p className="text-gray-600 mt-2">
                  Describe the steps to reproduce, your browser and OS, and attach screenshots.
                  We’ll triage and follow up with a fix or workaround.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUs;