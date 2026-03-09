const PrivacyPage = () => (
  <main className="pt-24 pb-20 min-h-screen bg-background">
    <div className="container max-w-3xl">
      <h1 className="font-display text-4xl font-bold mb-8">Privacy Policy</h1>
      <div className="font-body text-sm text-muted-foreground space-y-6 leading-relaxed">
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">1. Information We Collect</h2>
          <p>We collect personal information you provide directly, such as your name, email, phone number, and delivery address when placing orders or making reservations.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">2. How We Use Your Information</h2>
          <p>We use your information to process orders, manage reservations, improve our services, and communicate with you about promotions and updates.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">3. Data Security</h2>
          <p>We implement industry-standard security measures to protect your personal data. All data is transmitted over HTTPS and stored securely.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">4. Google Sign-In</h2>
          <p>When you sign in with Google, we receive your basic profile information (name, email, avatar). We do not access your Google contacts, calendar, or other data.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">5. Cookies</h2>
          <p>We use essential cookies to maintain your session. No third-party tracking cookies are used.</p>
        </section>
        <section>
          <h2 className="font-display text-lg font-semibold text-foreground mb-2">6. Contact</h2>
          <p>For privacy concerns, contact us at privacy@spicegarden.in or +91 98765 43210.</p>
        </section>
        <p className="text-xs">Last updated: March 2026</p>
      </div>
    </div>
  </main>
);

export default PrivacyPage;
