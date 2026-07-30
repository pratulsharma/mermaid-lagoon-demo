'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mermaidalay_visited', 'true');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand brand-wordmark" href="/" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
            <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" style={{ height: 'auto', width: 'auto', maxHeight: '36px' }} />
          </a>
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/#packages">Packages</a>
            <a href="/gallery">Gallery</a>
            <a href="/#service-areas">Locations</a>
            <a href="/about">About</a>
            <a href="/faq">FAQ</a>
            <a href="/contact" style={{fontWeight: '700'}}>Contact Us</a>
            <a href="/" className="button primary" style={{padding: '8px 20px', fontSize: '14px', whiteSpace: 'nowrap'}}>Book Now</a>
            <a href="/admin/login" style={{fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit'}}>⚙️</a>
          </div>
          <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
        <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="/#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
          <a href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="/#service-areas" onClick={() => setMobileMenuOpen(false)}>Locations</a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <a href="/contact" onClick={() => setMobileMenuOpen(false)} style={{fontWeight: '700'}}>Contact Us</a>
          <a href="/" className="button primary" style={{width: '100%', marginTop: '8px'}}>Book Now</a>
        </div>
      </header>

      <section className="section" style={{paddingTop: '120px'}}>
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">Get in Touch</p>
            <h1>Contact Us</h1>
            <p>Have questions about our mermaid lagoon experiences? We'd love to hear from you!</p>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginTop: '60px', maxWidth: '1000px', margin: '60px auto 0'}}>
            {/* Contact Form */}
            <div>
              <h2 style={{fontSize: '24px', marginBottom: '24px', color: '#00a0b8'}}>Send us a message</h2>
              {submitted ? (
                <div style={{padding: '40px', background: '#e0fbff', borderRadius: '12px', textAlign: 'center'}}>
                  <div style={{fontSize: '48px', marginBottom: '16px'}}>✓</div>
                  <h3 style={{marginBottom: '8px'}}>Message Sent!</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
                  <label>
                    Name *
                    <input 
                      type="text" 
                      required 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      style={{display: 'block', width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '15px', marginTop: '8px'}}
                    />
                  </label>
                  <label>
                    Email *
                    <input 
                      type="email" 
                      required 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      style={{display: 'block', width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '15px', marginTop: '8px'}}
                    />
                  </label>
                  <label>
                    Phone
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="(555) 123-4567"
                      style={{display: 'block', width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '15px', marginTop: '8px'}}
                    />
                  </label>
                  <label>
                    Message *
                    <textarea 
                      required 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows="6"
                      style={{display: 'block', width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '15px', marginTop: '8px', fontFamily: 'inherit', resize: 'vertical'}}
                    />
                  </label>
                  <button type="submit" className="button primary" style={{width: '100%'}}>Send Message</button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div>
              <h2 style={{fontSize: '24px', marginBottom: '24px', color: '#00a0b8'}}>Contact Information</h2>
              
              <div style={{display: 'flex', flexDirection: 'column', gap: '32px'}}>
                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <span style={{fontSize: '24px'}}>📞</span>
                    <h3 style={{fontSize: '18px', margin: 0}}>Phone</h3>
                  </div>
                  <p style={{marginLeft: '36px', color: '#666'}}>
                    <a href="tel:+15551234567" style={{color: '#00a0b8', textDecoration: 'none', fontWeight: '600'}}>(555) 123-4567</a>
                  </p>
                  <p style={{marginLeft: '36px', fontSize: '14px', color: '#999'}}>Mon-Fri: 9am-6pm PST<br/>Sat-Sun: 10am-4pm PST</p>
                </div>

                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <span style={{fontSize: '24px'}}>✉️</span>
                    <h3 style={{fontSize: '18px', margin: 0}}>Email</h3>
                  </div>
                  <p style={{marginLeft: '36px', color: '#666'}}>
                    <a href="mailto:hello@mermaidalay.com" style={{color: '#00a0b8', textDecoration: 'none', fontWeight: '600'}}>hello@mermaidalay.com</a>
                  </p>
                  <p style={{marginLeft: '36px', fontSize: '14px', color: '#999'}}>We typically respond within 24 hours</p>
                </div>

                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <span style={{fontSize: '24px'}}>📍</span>
                    <h3 style={{fontSize: '18px', margin: 0}}>Service Areas</h3>
                  </div>
                  <p style={{marginLeft: '36px', color: '#666'}}>
                    San Jose, Sunnyvale, Mountain View,<br/>
                    Cupertino, Los Altos & surrounding areas
                  </p>
                  <p style={{marginLeft: '36px', fontSize: '14px', color: '#999'}}>Expanding to more regions soon!</p>
                </div>

                <div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px'}}>
                    <span style={{fontSize: '24px'}}>🎉</span>
                    <h3 style={{fontSize: '18px', margin: 0}}>Ready to Book?</h3>
                  </div>
                  <p style={{marginLeft: '36px', color: '#666', marginBottom: '12px'}}>
                    Start planning your magical mermaid experience today!
                  </p>
                  <a href="/" className="button primary" style={{marginLeft: '36px', display: 'inline-block'}}>Book Now</a>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Link */}
          <div style={{textAlign: 'center', marginTop: '80px', padding: '40px', background: '#f9f9f9', borderRadius: '16px'}}>
            <h3 style={{marginBottom: '12px', color: '#00a0b8'}}>Have Questions?</h3>
            <p style={{marginBottom: '20px', color: '#666'}}>Check out our FAQ page for quick answers to common questions about our lagoon experiences, safety, pricing, and more.</p>
            <a href="/faq" className="button secondary">View FAQ</a>
          </div>
        </div>
      </section>

      <footer style={{background: '#173c50', color: 'white', padding: '60px 0 30px', marginTop: '120px'}}>
        <div className="container">
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px', marginBottom: '40px'}}>
            <div>
              <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" style={{height: '32px', marginBottom: '16px', filter: 'brightness(0) invert(1)'}} />
              <p style={{fontSize: '14px', opacity: 0.8}}>Creating magical mermaid experiences across California</p>
            </div>
            <div>
              <h4 style={{marginBottom: '16px', fontSize: '16px'}}>Quick Links</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <a href="/" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>Home</a>
                <a href="/#packages" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>Packages</a>
                <a href="/gallery" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>Gallery</a>
                <a href="/about" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>About</a>
                <a href="/faq" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>FAQ</a>
              </div>
            </div>
            <div>
              <h4 style={{marginBottom: '16px', fontSize: '16px'}}>Legal</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
                <a href="/privacy" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>Privacy Policy</a>
                <a href="/terms" style={{color: 'white', opacity: 0.8, textDecoration: 'none', fontSize: '14px'}}>Terms & Conditions</a>
              </div>
            </div>
            <div>
              <h4 style={{marginBottom: '16px', fontSize: '16px'}}>Contact</h4>
              <div style={{display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '14px', opacity: 0.8}}>
                <a href="tel:+15551234567" style={{color: 'white', textDecoration: 'none'}}>📞 (555) 123-4567</a>
                <a href="mailto:hello@mermaidalay.com" style={{color: 'white', textDecoration: 'none'}}>✉️ hello@mermaidalay.com</a>
              </div>
            </div>
          </div>
          <div style={{borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '20px', textAlign: 'center', fontSize: '14px', opacity: 0.6}}>
            © 2026 Mermaidalay. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
