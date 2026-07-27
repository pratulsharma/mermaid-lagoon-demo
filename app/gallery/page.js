'use client';

import { useState, useEffect } from 'react';

export default function Gallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mermaidalay_visited', 'true');
    }
  }, []);

  const videos = [
    { id: 'backyard', title: 'Backyard Lagoon Experience', src: '/videos/use_the_inflatable_pool_make.mp4', poster: '/images/lagoon-kids.png' }
  ];

  const images = [
    { src: '/images/lagoon-adventure.jpg', alt: 'Mermaidalay branded lagoon adventure', width: 2 },
    { src: '/images/mermaid-throne.png', alt: 'Child wearing a pink mermaid tail seated in a shell throne' },
    { src: '/images/treasure-shell.png', alt: 'Shell filled with mermaid crowns, pearls and treasures' },
    { src: '/images/logo-jewels.png', alt: 'Mermaidalay logo surrounded by crowns and pearls' },
    { src: '/images/hero-poster.jpeg', alt: 'Mermaid Lagoon promotional poster' }
  ];

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand brand-wordmark" href="/#top" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
                      <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" style={{ height: 'auto', width: 'auto', maxHeight: '36px' }} />
          </a>
          <div className="nav-links">
            <a href="/#experience">Why us?</a>
            <a href="/#packages">Packages</a>
            <a href="/#reels">Reels</a>
            <a href="/gallery">Gallery</a>
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
                  <a href="/#experience" onClick={() => setMobileMenuOpen(false)}>Why us?</a>
                  <a href="/#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
                  <a href="/#reels" onClick={() => setMobileMenuOpen(false)}>Reels</a>
                  <a href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
                  <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
                  <a href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
                  <button type="button" onClick={() => { setContactOpen(true); setMobileMenuOpen(false); }}>Contact Us</button>
                  <a href="tel:+15551234567">📞 (555) 123-4567</a>
              </div>
      </header>

   

      <section className="section" id="demo-videos">
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">Demo Reels</p>
            <h2>Watch the experience</h2>
          </div>
          <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', marginTop: '48px'}}>
            {videos.map(video => (
              <div key={video.id} style={{cursor: 'pointer'}} onClick={() => setSelectedVideo(video)}>
                <figure style={{margin: 0, overflow: 'hidden', borderRadius: '16px'}}>
                        <video style={{ width: '100%', height: 'auto', display: 'block', background: '#f0f0f0' }} poster={video.poster} controls playsInline preload="metadata" muted>
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <figcaption style={{padding: '16px', textAlign: 'center', color: '#073d63', fontWeight: '500'}}>{video.title}</figcaption>
                </figure>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section section" id="photo-gallery">
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">Photo Gallery</p>
            <h2>Moments of pure magic</h2>
          </div>
          <div className="gallery-grid" style={{marginTop: '48px'}}>
            {images.map((image, idx) => (
              <figure key={idx} style={{gridColumn: image.width ? `span ${image.width}` : 'auto', margin: 0, overflow: 'hidden', borderRadius: '12px'}}>
                <img src={image.src} alt={image.alt} style={{width: '100%', height: 'auto', display: 'block', borderRadius: '12px'}} />
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{background: 'linear-gradient(135deg, rgba(233, 110, 170, .08), rgba(168, 18, 78, .04))', textAlign: 'center'}}>
        <div className="container">
          <p className="eyebrow">Ready to create your own magic?</p>
          <h2 style={{marginBottom: '32px'}}>Book your Mermaid Lagoon experience today</h2>
          <a href="/#booking" className="button primary" style={{display: 'inline-block'}}>Plan my party</a>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand brand-wordmark"><img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" /></div>
            <p>Premium inflatable mermaid lagoon experiences for unforgettable parties and events.</p>
          </div>
          <div><strong>Explore</strong><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/about">About</a><a href="/faq">FAQ</a></div>
          <div><strong>Legal</strong><a href="/legal/mermaidalay-waiver.pdf" target="_blank" rel="noreferrer">Waiver PDF</a><span>California launch market</span></div>
        </div>
        <div className="container footer-bottom">© 2026 Mermaidalay. Demo website.</div>
      </footer>

      {selectedVideo && (
        <div className="video-modal-backdrop" onClick={() => setSelectedVideo(null)}>
          <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
            <button className="video-modal-close" type="button" onClick={() => setSelectedVideo(null)}>✕</button>
                      <video className="video-modal-player" autoPlay controls playsInline muted>
              <source src={selectedVideo.src} type="video/mp4" />
            </video>
          </div>
        </div>
      )}

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
