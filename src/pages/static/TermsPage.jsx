import React from 'react';

const TermsPage = () => {
  return (
    <div className="space-y-6 max-w-3xl mx-auto text-xs sm:text-sm leading-relaxed text-gray-650 dark:text-gray-400">
      <h1 className="text-2xl font-black text-primary dark:text-white tracking-tight border-b border-gray-100 dark:border-gray-800 pb-4">Terms & Conditions</h1>
      <p className="italic">Last Updated: July 2026</p>
      
      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">1. Agreement to Terms</h2>
        <p>
          By accessing or using the AURA e-commerce platform, you agree to be bound by these Terms and Conditions and our Privacy Policy. If you do not agree, please do not use the store services.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">2. User Account Security</h2>
        <p>
          When you register a profile, you are responsible for maintaining password security and credentials. You agree to notify AURA support immediately of unauthorized access to your account.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">3. Pricing and Order Approvals</h2>
        <p>
          We reserve the right to cancel or refuse orders due to catalog pricing discrepancies, inventory shortages, or suspicion of fraudulent credit card activity.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-base font-bold text-primary dark:text-white">4. Intellectual Property</h2>
        <p>
          All assets, typography, logo brand marks, graphic layouts, and product descriptions on the AURA website are the intellectual property of AURA Inc. and may not be reproduced without written authorization.
        </p>
      </section>
    </div>
  );
};

export default TermsPage;
