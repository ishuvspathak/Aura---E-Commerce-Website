import React, { useState } from 'react';

const FAQPage = () => {
  const categories = [
    {
      title: "Shipping & Delivery",
      questions: [
        { q: "How long does shipping take?", a: "Standard shipping takes 3-5 business days. Express shipping options take 1-2 business days depending on address location." },
        { q: "Do you ship internationally?", a: "Currently we ship across North America, Europe, and select countries in Asia. Specific shipping charges apply at checkout." }
      ]
    },
    {
      title: "Returns & Exchanges",
      questions: [
        { q: "Can I return an item?", a: "Yes. Returns are accepted within 30 days of shipment receipt. Items must be in brand new, original, unused condition." },
        { q: "How do I start a return?", a: "Contact customer support at support@aura.com or visit your order history inside profile settings to request a return label." }
      ]
    },
    {
      title: "Security & Payments",
      questions: [
        { q: "What payment options do you support?", a: "We process all major credit cards (Visa, MasterCard, Amex), UPI wallets, bank transfers, and Cash on Delivery." },
        { q: "Is my card data safe?", a: "Yes. Aura processing servers encrypt card data using TLS 1.3 encryption protocols, complying with PCIDSS standards." }
      ]
    }
  ];

  const [activeFaq, setActiveFaq] = useState('');

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div className="text-center">
        <span className="text-xs font-bold tracking-wider uppercase text-accent">Help Center</span>
        <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight mt-1">Frequently Asked Questions</h1>
      </div>

      <div className="space-y-8">
        {categories.map((cat) => (
          <div key={cat.title} className="space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-100 dark:border-gray-800 pb-2">{cat.title}</h2>
            <div className="space-y-3">
              {cat.questions.map((faq, idx) => {
                const uniqueId = `${cat.title}-${idx}`;
                const isOpen = activeFaq === uniqueId;
                return (
                  <div key={idx} className="border border-gray-150 dark:border-gray-800 rounded-2xl overflow-hidden bg-white dark:bg-card-dark">
                    <button
                      onClick={() => setActiveFaq(isOpen ? '' : uniqueId)}
                      className="w-full flex justify-between items-center p-5 text-left font-semibold text-xs sm:text-sm text-primary dark:text-white hover:bg-gray-50 focus:outline-none"
                    >
                      <span>{faq.q}</span>
                      <span className="text-lg font-bold text-gray-400">{isOpen ? '-' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-5 pt-0 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-50 dark:border-gray-850 leading-relaxed bg-gray-50/50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
