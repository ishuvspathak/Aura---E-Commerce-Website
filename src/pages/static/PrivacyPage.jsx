import React from 'react';

const PrivacyPage = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed text-gray-650 dark:text-gray-400">
      <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight border-b border-gray-100 dark:border-gray-800 pb-4">Privacy Policy</h1>
      <p className="italic">Last Updated: July 2026</p>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">1. Information We Collect</h2>
        <p>
          We collect personal data like your name, shipping address, contact phone, and email address when you complete checkouts, register accounts, or sign up for our newsletter.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">2. How We Use Data</h2>
        <p>
          We use collection data to fulfill shipments, verify checkout transactions, send email status notifications, compile dashboard demographics, and send promotional newsletters.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">3. Cookies and Analytics</h2>
        <p>
          AURA processes cookies to cache cart lists, wishlist selections, user preferences (such as Dark/Light theme toggles), and Live Search autocomplete keywords.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">4. Third-Party Integrations</h2>
        <p>
          We do not sell customer details. We share credentials only with integrated shipping carriers (Fulfillment APIs) and payment processor gateways to authorize secure billing.
        </p>
      </section>
    </div>
  );
};

export default PrivacyPage;
