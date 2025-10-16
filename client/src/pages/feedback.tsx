import React, { useState } from 'react';

const FeedbackPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    feedbackType: 'suggestion',
    message: '',
    rating: 0
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);

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
        feedbackType: 'suggestion',
        message: '',
        rating: 0
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Share Your Feedback
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          We value your input to help us improve EventHub
        </p>

        <div className="bg-gray-800 rounded-xl p-8">
          {submitSuccess ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-6">🎉</div>
              <h2 className="text-2xl font-semibold mb-4">Thank You for Your Feedback!</h2>
              <p className="text-gray-300 max-w-md mx-auto">
                We appreciate you taking the time to share your thoughts with us.
                Your feedback helps us make EventHub better for everyone.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="space-y-8">
                <div>
                  <label htmlFor="name" className="block text-gray-300 mb-2">Name (Optional)</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 mb-2">Email (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-gray-500 text-sm mt-2">
                    If you'd like us to follow up with you
                  </p>
                </div>
                
                <div>
                  <label className="block text-gray-300 mb-2">How would you rate your experience?</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="text-2xl focus:outline-none"
                      >
                        {star <= (hoverRating || formData.rating) ? '⭐️' : '☆'}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="feedbackType" className="block text-gray-300 mb-2">Feedback Type</label>
                  <select
                    id="feedbackType"
                    name="feedbackType"
                    value={formData.feedbackType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="suggestion">Suggestion</option>
                    <option value="bug">Bug Report</option>
                    <option value="praise">Praise</option>
                    <option value="criticism">Criticism</option>
                    <option value="feature">Feature Request</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2">Your Feedback</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                    placeholder="What do you like about EventHub? What can we improve?"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4">Other Ways to Contribute</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              Join Our Beta Program
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              Participate in User Research
            </button>
            <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors">
              Vote on Feature Requests
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPage;