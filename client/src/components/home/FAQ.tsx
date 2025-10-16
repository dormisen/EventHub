import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: 'How do I book an event?',
    answer: 'Simply browse our event catalog, select the event you want to attend, choose your tickets, and complete the secure checkout process. You\'ll receive instant confirmation via email.',
  },
  {
    question: 'Is payment secure?',
    answer: 'Yes, absolutely. We use bank-level encryption and comply with PCI DSS standards. All transactions are processed through secure payment gateways, and we never store your full card details.',
  },
  {
    question: 'Can I cancel or refund my ticket?',
    answer: 'Cancellation policies vary by event organizer. You can find the specific refund policy on each event page. Many events offer full refunds up to 7 days before the event date.',
  },
  {
    question: 'How do I receive my tickets?',
    answer: 'Tickets are delivered instantly to your email and are available in your EventHub account. You can display them on your mobile device or print them out for entry.',
  },
  {
    question: 'Can I transfer tickets to someone else?',
    answer: 'Yes, most events allow ticket transfers. You can easily transfer tickets to friends through your account dashboard. Both parties will receive confirmation of the transfer.',
  },
  {
    question: 'What if an event is cancelled?',
    answer: 'If an organizer cancels an event, you\'ll receive a full automatic refund to your original payment method within 5-7 business days, plus a notification email.',
  },
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-blue-400" />
            <h2 className="text-4xl md:text-5xl font-bold">
              Frequently Asked Questions
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Everything you need to know about EventHub
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex items-center justify-between hover:bg-white/5 transition"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-6 w-6 text-gray-400" />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed border-t border-white/10 pt-4">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <button className="text-blue-400 hover:text-blue-300 font-semibold transition">
            Contact Support →
          </button>
        </motion.div>
      </div>
    </section>
  );
};
