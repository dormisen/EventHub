import React, { useState } from 'react';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'technical'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'technical'
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Customer Support
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          We're here to help with any questions or issues
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-gray-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Us</h2>
              
              {submitSuccess ? (
                <div className="bg-green-900/30 border border-green-700 rounded-lg p-6 text-center">
                  <div className="text-4xl mb-4">✓</div>
                  <h3 className="text-xl font-semibold mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-300">
                    Our support team will get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-300 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-300 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="category" className="block text-gray-300 mb-2">Support Category</label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="technical">Technical Support</option>
                        <option value="billing">Billing & Payments</option>
                        <option value="account">Account Issues</option>
                        <option value="events">Event Management</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="subject" className="block text-gray-300 mb-2">Subject</label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="message" className="block text-gray-300 mb-2">Message</label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg transition-colors disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Submit Request'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-gray-800 rounded-xl p-8 mb-8">
              <h2 className="text-2xl font-semibold mb-6">Support Options</h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <div className="w-6 h-6">📞</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Phone Support</h3>
                    <p className="text-gray-400 mb-2">Available 24/7</p>
                    <p className="text-indigo-400">+1 (800) 123-4567</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <div className="w-6 h-6">💬</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Live Chat</h3>
                    <p className="text-gray-400 mb-2">Available 9AM-9PM EST</p>
                    <button className="text-indigo-400 hover:text-indigo-300">
                      Start a chat now
                    </button>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-indigo-600 p-3 rounded-lg mr-4">
                    <div className="w-6 h-6">📚</div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Help Center</h3>
                    <p className="text-gray-400 mb-2">Find answers to common questions</p>
                    <button className="text-indigo-400 hover:text-indigo-300">
                      Visit Help Center
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-indigo-900/30 rounded-xl p-8">
              <h2 className="text-2xl font-semibold mb-4">Community Support</h2>
              <p className="text-gray-300 mb-6">
                Join our community forums to get help from other EventHub users and share your knowledge.
              </p>
              <button className="w-full bg-white text-gray-900 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
                Visit Community Forums
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;