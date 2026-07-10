import React from 'react';

const RefundPolicyPage = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed text-gray-650 dark:text-gray-400">
      <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight border-b border-gray-100 dark:border-gray-800 pb-4">Returns & Refunds Policy</h1>
      <p className="italic">Last Updated: July 2026</p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">1. Return Window</h2>
        <p>
          We offer a 30-day return policy. You have 30 calendar days from the date of shipment delivery to request a return credit or exchange label.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">2. Item Qualifications</h2>
        <p>
          Items must be unused, in the same shape you received them, and enclosed inside their original retail boxing with all seals and cards attached.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">3. Refund Processing</h2>
        <p>
          Once your return package is received and inspected at our warehouse, we will notify you of approval. Approved refunds are processed to your original credit card or payment method in 5-7 business days.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">4. Exceptions and Exclusions</h2>
        <p>
          Items marked "Final Sale", personalized/engraved products, and gift cards are not eligible for returns.
        </p>
      </section>
    </div>
  );
};

export default RefundPolicyPage;
