import  { useState } from 'react';

const HelpPage = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  
  const categories = [
    { id: 'general', name: 'General Questions' },
    { id: 'account', name: 'Account Settings' },
    { id: 'events', name: 'Event Management' },
    { id: 'tickets', name: 'Tickets & Registration' },
    { id: 'payments', name: 'Payments & Pricing' }
  ];
  
  const faqs = {
    general: [
      { question: "How do I create an account?", answer: "Click on the 'Sign Up' button in the top right corner and follow the prompts to create your account." },
      { question: "Is EventHub free to use?", answer: "EventHub offers a free basic plan. Premium features are available through paid subscription plans." },
      { question: "How do I contact customer support?", answer: "You can reach our support team 24/7 through the contact form on our Contact Us page." }
    ],
    account: [
      { question: "How do I change my password?", answer: "Go to Account Settings > Security and click 'Change Password'. You'll need to verify your current password first." },
      { question: "Can I delete my account?", answer: "Yes, you can delete your account permanently from the Account Settings page under 'Advanced Settings'." }
    ],
    events: [
      { question: "How do I create an event?", answer: "After logging in, click 'Create Event' on your dashboard and follow the step-by-step process." },
      { question: "Can I import attendees from another platform?", answer: "Yes, we support CSV imports from most major event platforms." }
    ],
    tickets: [
      { question: "How do ticket sales work?", answer: "You set the price and quantity. We handle the transactions and send tickets to attendees via email." },
      { question: "What payment methods do you accept?", answer: "We accept all major credit cards and PayPal." }
    ],
    payments: [
      { question: "When do I get paid for ticket sales?", answer: "Payments are processed 3 business days after your event concludes." },
      { question: "What are your service fees?", answer: "We charge a 5% service fee on all ticket sales plus payment processing fees." }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Help Center
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Find answers to common questions and get support
        </p>

        <div className="bg-gray-800 rounded-xl p-6 mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <input 
              type="text" 
              placeholder="Search help articles..." 
              className="flex-grow px-4 py-3 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors">
              Search
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mb-8">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-indigo-600' 
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="space-y-6">
            {(faqs[activeCategory as keyof typeof faqs] ?? []).map(
              (faq: { question: string; answer: string }, index: number) => (
                <div key={index} className="border-b border-gray-700 pb-6">
                  <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-400">{faq.answer}</p>
                </div>
              )
            )}
          </div>
        </div>

        <div className="bg-indigo-900/30 rounded-xl p-8">
          <h2 className="text-2xl font-semibold mb-4">Still need help?</h2>
          <p className="text-gray-300 mb-6">
            Our support team is available 24/7 to answer your questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors">
              Contact Support
            </button>
            <button className="border border-indigo-400 text-indigo-400 px-6 py-3 rounded-lg hover:bg-indigo-900/50 transition-colors">
              Community Forums
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;