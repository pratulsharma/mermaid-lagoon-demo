'use client';

import { useState } from 'react';

export default function Terms() {
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
          <h1>Terms & Conditions</h1>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{maxWidth: '800px'}}>
          <div style={{marginBottom: '80px'}}>
            <p><strong>Effective Date:</strong> January 1, 2026</p>
            
            <h2>1. Acceptance of Terms</h2>
            <p>By booking Mermaidalay services, you agree to these Terms and Conditions. If you do not agree, please do not use our services.</p>

            <h2>2. Service Description</h2>
            <p>Mermaidalay provides inflatable mermaid lagoon rentals, including equipment, setup, breakdown, and accessories as specified in your selected package.</p>

            <h2>3. Booking and Payment</h2>
            <ul>
              <li><strong>Deposit:</strong> A non-refundable 30% deposit is required at booking</li>
              <li><strong>Balance:</strong> Remaining balance due 7 days before the event</li>
              <li><strong>Payment Methods:</strong> We accept credit cards, debit cards, and electronic transfers</li>
              <li><strong>Prices:</strong> All prices are in USD and subject to applicable taxes</li>
            </ul>

            <h2>4. Cancellation Policy</h2>
            <ul>
              <li><strong>More than 14 days before event:</strong> 30% non-refundable deposit forfeited</li>
              <li><strong>Within 7 days of event:</strong> No refund</li>
              <li><strong>Unsafe weather:</strong> One complimentary reschedule within 12 months, subject to availability</li>
              <li><strong>No-shows or inaccessible setup:</strong> No refund</li>
            </ul>

            <h2>5. Permits and Public Spaces</h2>
            <p><strong>Public Location Requirement:</strong> Rentals at public parks or other public spaces require any permits or approvals required by the property owner or local authority. Customers are responsible for obtaining these permits before their event. Mermaidalay cannot install the inflatable without the required authorization.</p>

            <h2>6. Customer Responsibilities</h2>
            <ul>
              <li>Provide accurate event location and contact information</li>
              <li>Ensure adequate space for setup (minimum 20 ft × 20 ft recommended)</li>
              <li>Provide access to water and electricity if required</li>
              <li>Obtain necessary permits for public venues</li>
              <li>Ensure adult supervision at all times during use</li>
              <li>Follow all safety guidelines and instructions</li>
              <li>Inspect equipment upon delivery and report any damage immediately</li>
            </ul>

            <h2>7. Safety Requirements</h2>
            <ul>
              <li>Pool dimensions: 15 ft × 15 ft, maximum water depth 2 feet</li>
              <li>Adult supervision required at all times</li>
              <li>Mermaid tails must be used according to age and height guidelines</li>
              <li>Life jackets recommended for non-swimmers</li>
              <li>No diving, running, or rough play</li>
              <li>Maximum capacity must be observed</li>
              <li>No shoes, sharp objects, food, or drinks in the inflatable</li>
            </ul>

            <h2>8. Liability and Insurance</h2>
            <p>Customers must sign a liability waiver before the event. Mermaidalay is not liable for injuries or damages resulting from misuse, failure to follow instructions, or inadequate supervision.</p>

            <h2>9. Damage and Loss</h2>
            <p>Customers are responsible for any damage to equipment beyond normal wear and tear. A damage fee may be charged for:</p>
            <ul>
              <li>Tears, holes, or burns</li>
              <li>Lost or damaged accessories</li>
              <li>Stains or excessive dirt</li>
            </ul>

            <h2>10. Weather and Rescheduling</h2>
            <p>In case of unsafe weather conditions (high winds, lightning, extreme temperatures), Mermaidalay reserves the right to postpone or cancel setup. One complimentary reschedule will be offered within 12 months.</p>

            <h2>11. Intellectual Property</h2>
            <p>All content, images, logos, and branding are the property of Mermaidalay and may not be used without written permission.</p>

            <h2>12. Modifications</h2>
            <p>Mermaidalay reserves the right to modify these Terms at any time. Continued use of our services constitutes acceptance of updated Terms.</p>

            <h2>13. Governing Law</h2>
            <p>These Terms are governed by the laws of the State of California, United States.</p>

            <h2>14. Contact Information</h2>
            <p>For questions about these Terms, please contact:</p>
            <p>
              <strong>Mermaidalay</strong><br/>
              Email: info@mermaidalay.com<br/>
              Phone: (555) 123-4567
            </p>
          </div>
        </div>
      </section>

      <footer><div className="container footer-grid"><div><div className="brand footer-brand brand-wordmark"><img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" /></div><p>Premium inflatable mermaid lagoon experiences for unforgettable parties and events.</p></div><div><strong>Explore</strong><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/about">About</a><a href="/faq">FAQ</a></div><div><strong>Legal</strong><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/legal/mermaidalay-waiver.pdf" target="_blank" rel="noreferrer">Waiver PDF</a></div></div><div className="container footer-bottom">© 2026 Mermaidalay. Demo website.</div></footer>
    </main>
  );
}
