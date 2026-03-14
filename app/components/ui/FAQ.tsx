'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface FAQProps {
  items?: FAQItem[];
}

const FAQ = ({ items }: FAQProps) => {
  // Set initial state to 1 to open the first FAQ by default
  const [openId, setOpenId] = useState<number | null>(1);

  // Default FAQs if no items provided
  const defaultFaqs: FAQItem[] = [
    {
      id: 1,
      question: "What is FinTrackerPro and how does it work?",
      answer: "FinTrackerPro is a comprehensive financial tracking platform that connects to your bank accounts, credit cards, and investment portfolios to provide a complete picture of your financial health."
    },
    {
      id: 2,
      question: "Is my financial data secure?",
      answer: "Absolutely! We use bank-level 256-bit encryption to protect your data. We never store your banking credentials and use secure, read-only access."
    },
    {
      id: 3,
      question: "How much does FinTrackerPro cost?",
      answer: "FinTrackerPro offers a free tier with basic features. Our Pro plan is $9.99/month or $89.99/year with a 14-day free trial."
    }
  ];

  const faqs = items || defaultFaqs;

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <div
          key={faq.id}
          className={`border border-border rounded-lg overflow-hidden bg-card transition-colors duration-300 ${
            openId === faq.id ? 'border-button/30 shadow-md' : ''
          }`}
        >
          <button
            onClick={() => toggleFAQ(faq.id)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-secondary/50 transition-colors duration-300"
            aria-expanded={openId === faq.id}
          >
            <span className="text-base md:subtitle text-card-foreground pr-4 md:pr-8 font-medium">
              {faq.question}
            </span>
            <div className="shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-secondary flex items-center justify-center">
              {openId === faq.id ? (
                <ChevronUp className="w-3 h-3 md:w-4 md:h-4 text-secondary-foreground" />
              ) : (
                <ChevronDown className="w-3 h-3 md:w-4 md:h-4 text-muted-foreground" />
              )}
            </div>
          </button>

          <div
            className={`transition-all duration-300 ease-in-out ${
              openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            } overflow-hidden`}
          >
            <div className="p-4 md:p-6 pt-0 md:pt-0">
              <p className="text-sm md:paragraph text-muted-foreground">
                {faq.answer}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FAQ;