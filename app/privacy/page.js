'use client';

import { useState } from 'react';

export default function Privacy() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand brand-wordmark" href="/" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
            <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" style={{ height: 'auto', width: 'auto', maxHeight: '36px' }} />
          </a>
          <div className="nav-links">
            <a href="/#top">Home</a><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/#service-areas">Locations</a><a href="/about">About</a><a href="/faq">FAQ</a>
          </div>
          <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="/#top" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
          <a href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="/#service-areas" onClick={() => setMobileMenuOpen(false)}>Locations</a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
        </div>
      </header>

      <section className="hero simple-hero">
        <div className="container">
          <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain'}} />
          <p className="eyebrow">Legal</p>
          <h1>Privacy Policy</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{maxWidth: '800px'}}>
          <div style={{marginBottom: '80px'}}>
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            
            <h2>1. Introduction</h2>
            <p>Mermaidalay ("we," "us," or "our") values your privacy. This Privacy Policy explains how we collect, use, disclose, and protect your personal information when you use our website and services.</p>

            <h2>2. Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, event address, and payment information when you book our services</li>
              <li><strong>Event Information:</strong> Event date, location, package selection, and special requests</li>
              <li><strong>Technical Information:</strong> IP address, browser type, device information, and usage data</li>
              <li><strong>Waiver Information:</strong> Electronic signatures and liability waiver acknowledgments</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul>
              <li>Process and fulfill your booking requests</li>
              <li>Communicate with you about your event</li>
              <li>Send booking confirmations and reminders</li>
              <li>Process payments and manage accounts</li>
              <li>Improve our services and website</li>
              <li>Comply with legal obligations</li>
              <li>Send promotional materials (with your consent)</li>
            </ul>

            <h2>4. Information Sharing and Disclosure</h2>
            <p>We do not sell your personal information. We may share your information with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Payment processors, delivery services, and other vendors who help us operate</li>
              <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, sale, or acquisition</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Opt-out of marketing communications</li>
              <li>Withdraw consent at any time</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>We use cookies and similar technologies to enhance your experience, analyze usage, and deliver personalized content. You can control cookies through your browser settings.</p>

            <h2>8. Children's Privacy</h2>
            <p>Our services are intended for events involving children, but we do not knowingly collect personal information directly from children under 13 without parental consent.</p>

            <h2>9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for their privacy practices.</p>

            <h2>10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new policy on our website.</p>

            <h2>11. Contact Us</h2>
            <p>If you have questions about this Privacy Policy, please contact us:</p>
            <p>
              <strong>Mermaidalay</strong><br/>
              Email: privacy@mermaidalay.com<br/>
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </section>

      <footer><div className="container footer-grid"><div><div className="brand footer-brand brand-wordmark"><img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" /></div><p>Premium inflatable mermaid lagoon experiences for unforgettable parties and events.</p></div><div><strong>Explore</strong><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/about">About</a><a href="/faq">FAQ</a></div><div><strong>Legal</strong><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/legal/mermaidalay-waiver.pdf" target="_blank" rel="noreferrer">Waiver PDF</a></div></div><div className="container footer-bottom">© 2026 Mermaidalay. Demo website.</div></footer>
    </main>
  );
}
