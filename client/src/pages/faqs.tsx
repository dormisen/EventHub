import { useState } from 'react';

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I create an event on EventHub?",
      answer: "To create an event, log in to your account, click 'Create Event' on your dashboard, and follow the step-by-step process to add event details, tickets, and settings."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) as well as PayPal payments."
    },
    {
      question: "Can I get a refund for my ticket?",
      answer: "Refund policies are set by event organizers. Please contact the organizer directly through the event page for refund requests."
    },
    {
      question: "How do I transfer my ticket to someone else?",
      answer: "Ticket transfers can be done through your EventHub account. Go to 'My Tickets', select the ticket, and click 'Transfer Ticket'."
    },
    {
      question: "Is there a mobile app for EventHub?",
      answer: "Yes, EventHub has mobile apps available for both iOS and Android devices. You can download them from the App Store or Google Play."
    },
    {
      question: "How do I contact an event organizer?",
      answer: "Each event page has a 'Contact Organizer' button. Click this to send a message directly to the event organizer."
    },
    {
      question: "What are the fees for using EventHub?",
      answer: "For attendees, there's a small service fee added to each ticket purchase. For organizers, we charge a percentage-based fee on ticket sales."
    },
    {
      question: "How do I become an event organizer?",
      answer: "Simply create an account and click 'Create Event' on your dashboard. There's no special approval process to become an organizer."
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-400 text-xl mb-12">
          Find quick answers to common questions about EventHub
        </p>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
              <button
                onClick={() => toggleFAQ(index)}
                className="flex justify-between items-center w-full p-6 text-left"
              >
                <h2 className="text-lg md:text-xl font-semibold">{faq.question}</h2>
                <span className="ml-4 text-indigo-400">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-300">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 bg-indigo-900/30 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-300 mb-6">
            Our support team is ready to help you 24/7
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;