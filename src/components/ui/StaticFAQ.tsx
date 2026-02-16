'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface StaticFAQProps {
  items?: FAQItem[];
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How long do greyhounds live?",
    answer: "Greyhounds typically live 12-14 years with proper care, nutrition, and regular veterinary check-ups. Some even live into their mid-teens!"
  },
  {
    question: "Are greyhounds good with children?",
    answer: "Yes! Greyhounds are known for their gentle, patient nature. They're often called '45-mile-per-hour couch potatoes' and make excellent family dogs. Their calm temperament makes them great companions for children."
  },
  {
    question: "What makes greyhounds unique as pets?",
    answer: "Greyhounds are surprisingly lazy despite their racing history. They're quiet, clean, and rarely bark. They have short coats that require minimal grooming, and they're often content with a comfortable couch and daily walks."
  },
  {
    question: "How much exercise do greyhounds need?",
    answer: "Contrary to popular belief, greyhounds are sprinters, not endurance runners. They only need 20-30 minutes of exercise per day. A short walk or a quick sprint in a fenced area is usually sufficient. Most of the time, they're happy lounging around the house!"
  },
  {
    question: "Do greyhounds get along with other pets?",
    answer: "Many greyhounds can live peacefully with other dogs and even cats, especially if they've been properly introduced. Some retired racers may have a high prey drive, so it's important to work with adoption organizations to find the right match for your household."
  },
  {
    question: "What special care do greyhounds need?",
    answer: "Greyhounds need soft bedding due to their lack of body fat and thin coats. They're sensitive to extreme temperatures, so they need coats in cold weather and air conditioning in hot weather. Regular dental care is also important for their overall health."
  }
];

export const StaticFAQ: React.FC<StaticFAQProps> = ({ items = defaultFAQs }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* FAQ Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gray-900 text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-all duration-300 flex items-center justify-center"
        aria-label={isOpen ? "Close FAQ" : "Open FAQ"}
      >
        {isOpen ? <X size={24} /> : <HelpCircle size={24} />}
      </button>

      {/* FAQ Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-[450px] max-h-[600px] bg-white rounded-lg shadow-xl flex flex-col overflow-hidden border border-gray-200"
          >
            {/* FAQ Title */}
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
              <div className="flex items-center">
                <MessageSquare size={20} className="mr-2" />
                <h3 className="font-bold text-lg tracking-wide chat-title">Greyhound FAQ</h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
                aria-label="Close FAQ"
              >
                <X size={18} />
              </button>
            </div>

            {/* FAQ Content */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              <div className="space-y-1">
                {items.map((item, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-b-0">
                    <button
                      className="flex justify-between items-center w-full py-3 text-left hover:text-gray-700 transition-colors"
                      onClick={() => toggleFAQ(index)}
                      aria-expanded={openIndex === index}
                    >
                      <span className="font-medium text-sm text-gray-800 pr-2">{item.question}</span>
                      <svg
                        className={`w-4 h-4 transition-transform flex-shrink-0 text-gray-500 ${
                          openIndex === index ? 'transform rotate-180' : ''
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
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
                          <p className="pb-3 text-sm text-gray-600 leading-relaxed pr-2">{item.answer}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Help Text */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  Have more questions? Contact your local greyhound adoption organization for personalized advice.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
