'use client';

import { useState, useEffect } from 'react';

export default function About() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mermaidalay_visited', 'true');
    }
  }, []);

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand brand-wordmark" href="/#top" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
                      <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" style={{ height: 'auto', width: 'auto', maxHeight: '36px' }} />
          </a>
          <div className="nav-links">
            <a href="/#top">Home</a>
            <a href="/#packages">Packages</a>
            <a href="/gallery">Gallery</a>
            <a href="/#service-areas">Locations</a>
            <a href="/about">About</a>
            <a href="/faq">FAQ</a>
          </div>
          <div className="nav-contact">
            <a href="tel:+15551234567" className="nav-phone">📞 (555) 123-4567</a>
            <button type="button" onClick={() => setContactOpen(true)} className="nav-email" style={{background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0}}>✉️ hello@mermaidalay.com</button>
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
                  <button type="button" onClick={() => { setContactOpen(true); setMobileMenuOpen(false); }}>Contact Us</button>
                  <a href="tel:+15551234567">📞 (555) 123-4567</a>
              </div>
      </header>

 

      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">Our Story</p>
            <h2>Born from a dream of wonder and magic.</h2>
            <p style={{fontSize: '18px', maxWidth: '800px', margin: '24px auto 0', lineHeight: '1.6'}}>Mermaidalay was created to bring childhood imagination to life. We believe every child deserves a moment of pure magic—a chance to become a mermaid, explore an enchanted lagoon, and create memories that last a lifetime.</p>
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">The Founder</p>
            <h2>Meet the visionary behind Mermaidalay</h2>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '900px', margin: '48px auto 0', gap: '32px'}}>
            <div style={{width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(0,212,230,0.3)', boxShadow: '0 8px 24px rgba(0,107,125,0.2)'}}>
              <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Founder" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
            </div>
            <div style={{textAlign: 'center'}}>
              <h3 style={{marginBottom: '8px', fontSize: '24px'}}>Josiane Cholette</h3>
              <p style={{color: '#00a0b8', fontWeight: 600, marginBottom: '24px'}}>Founder & CEO</p>
              <p style={{lineHeight: '1.8', marginBottom: '16px', maxWidth: '700px'}}>Josiane is a passionate entrepreneur with a lifelong vision of creating the world's first immersive mermaid water park. Currently studying Landscape Architecture while developing innovative products and experiences for children.</p>
              <p style={{lineHeight: '1.8', maxWidth: '700px'}}>Inspired by the inflatable industry, she created Mermaidalay—a unique mobile mermaid experience that makes premium entertainment accessible and affordable for families today, while serving as the first step toward her larger dream.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">Our Values</p>
            <h2>What drives us every day</h2>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '48px'}}>
            {[
              {icon: '✨', title: 'Magic First', desc: 'Every detail is designed to create wonder and unforgettable moments.'},
              {icon: '👨‍👩‍👧‍👦', title: 'Family Focused', desc: 'We create experiences that bring families together and spark imagination.'},
              {icon: '🌍', title: 'Accessible Excellence', desc: 'Premium experiences that are affordable for families everywhere.'},
              {icon: '♻️', title: 'Sustainable', desc: 'Eco-conscious practices that minimize environmental impact.'}
            ].map((value) => (
              <div key={value.title} style={{padding: '32px', borderRadius: '16px', background: 'rgba(255,240,248,0.5)', textAlign: 'center'}}>
                <div style={{fontSize: '40px', marginBottom: '16px'}}>{value.icon}</div>
                <h3 style={{marginBottom: '12px'}}>{value.title}</h3>
                <p style={{fontSize: '14px', lineHeight: '1.6'}}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="container">
          <div className="section-heading centered">
            <p className="eyebrow">Looking Forward</p>
            <h2>Building the future of immersive experiences</h2>
            <p style={{maxWidth: '800px', margin: '0 auto'}}>We're expanding our lagoon fleet, developing new themed experiences, and planning permanent Mermaid Lagoon destinations. The dream of a world where magic is accessible to all is just beginning.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand brand-wordmark"><img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" /></div>
            <p>Premium inflatable mermaid lagoon experiences for unforgettable parties and events.</p>
          </div>
          <div><strong>Explore</strong><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/about">About</a></div>
          <div><strong>Legal</strong><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/legal/mermaidalay-waiver.pdf" target="_blank" rel="noreferrer">Waiver PDF</a></div>
        </div>
        <div className="container footer-bottom">© 2026 Mermaidalay. Demo website.</div>
      </footer>

      {contactOpen && (
        <div className="booking-modal-backdrop" role="dialog" aria-modal="true" aria-label="Contact us" onClick={() => setContactOpen(false)}>
          <div className="booking-modal" onClick={(e) => e.stopPropagation()} style={{maxWidth: '600px', padding: '0', position: 'relative'}}>
            <div style={{padding: '40px 48px 32px', borderBottom: '1px solid rgba(0,107,125,0.1)'}}>
              <div>
                <p className="eyebrow" style={{margin: '0 0 12px', fontSize: '13px', letterSpacing: '0.05em', textTransform: 'uppercase', color: '#006b7d', opacity: 0.7}}>Get in Touch</p>
                <h2 style={{margin: 0, fontFamily: 'var(--font-fredoka), sans-serif', fontSize: '28px', color: '#006b7d', fontWeight: 600}}>Contact Mermaidalay</h2>
              </div>
              <button className="close-button" type="button" onClick={() => setContactOpen(false)} aria-label="Close contact form" style={{position: 'absolute', top: '24px', right: '24px', background: 'none', border: 'none', fontSize: '32px', cursor: 'pointer', color: '#006b7d', opacity: 0.5, lineHeight: 1}}>×</button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you! We\'ll be in touch soon.'); setContactOpen(false); }} style={{padding: '40px 48px'}}>
              <div style={{display: 'flex', flexDirection: 'column', gap: '28px'}}>
                <label style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <span style={{fontWeight: 600, fontSize: '15px'}}>Name *</span>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    style={{padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,107,125,0.2)', fontSize: '16px'}}
                  />
                </label>
                <label style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <span style={{fontWeight: 600, fontSize: '15px'}}>Email *</span>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    style={{padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,107,125,0.2)', fontSize: '16px'}}
                  />
                </label>
                <label style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <span style={{fontWeight: 600, fontSize: '15px'}}>Phone</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    style={{padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,107,125,0.2)', fontSize: '16px'}}
                  />
                </label>
                <label style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
                  <span style={{fontWeight: 600, fontSize: '15px'}}>Message *</span>
                  <textarea
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    rows={5}
                    style={{padding: '16px', borderRadius: '8px', border: '1px solid rgba(0,107,125,0.2)', fontSize: '16px', fontFamily: 'inherit', resize: 'vertical'}}
                  />
                </label>
                <button type="submit" className="button" style={{
                  padding: '16px 32px',
                  background: '#006b7d',
                  color: '#fff',
                  borderRadius: '999px',
                  fontFamily: 'var(--font-fredoka), sans-serif',
                  fontWeight: 600,
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  width: '100%',
                  marginTop: '8px'
                }}>Send Message</button>
              </div>
            </form>
            <div style={{padding: '24px 48px 40px', textAlign: 'center', borderTop: '1px solid rgba(0,107,125,0.1)'}}>
              <p style={{margin: '0 0 12px', fontSize: '15px', color: '#666'}}>Or call us directly:</p>
              <a href="tel:+15551234567" style={{fontSize: '20px', fontWeight: 600, color: '#006b7d', textDecoration: 'none'}}>📞 (555) 123-4567</a>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
