'use client';

import { useState, useEffect } from 'react';

export default function FAQ() {
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFAQIndex, setOpenFAQIndex] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mermaidalay_visited', 'true');
    }
  }, []);
  
  const faqs = [
    {
      question: "What is included in each party package?",
      answer: "Each package includes the inflatable mermaid lagoon (15 ft × 15 ft, up to 2 ft of water), water setup, mermaid tails, and everything listed in the selected package. Higher-tier packages include additional decorations, themed experiences, and premium features."
    },
    {
      question: "What ages are Mermaid parties best for?",
      answer: "Our experiences are designed primarily for children ages 4–12. Water depth recommendations: 12 inches (1 ft) for ages 2-5, 18 inches (1.5 ft) for ages 4-8, and 24 inches (2 ft) for ages 6-12."
    },
    {
      question: "What are the pool dimensions?",
      answer: "The inflatable mermaid lagoon is 15 ft × 15 ft, with a maximum water depth of 2 feet. This shallow design ensures safety for children while providing plenty of space for magical mermaid fun."
    },
    {
      question: "How much space is required?",
      answer: "We recommend a flat outdoor area measuring approximately 20 ft × 20 ft (400 sq ft minimum). If you're unsure, simply send us a photo of your yard and we'll help determine the best setup."
    },
    {
      question: "Do you provide the water?",
      answer: "Yes! We connect to your outdoor water faucet and fill the lagoon during setup."
    },
    {
      question: "How long does setup take?",
      answer: "Setup generally takes 60–90 minutes, depending on the package and location. We'll arrive before your scheduled party time so everything is ready when guests arrive."
    },
    {
      question: "Do I need to provide electricity?",
      answer: "Yes. We require access to one or more standard outdoor electrical outlets to power the inflatable equipment. If electricity isn't available, ask us about generator options."
    },
    {
      question: "Can the party be held at a park or public space?",
      answer: "Absolutely! Many parks are great locations. However, rentals at public parks or other public spaces require any permits or approvals required by the property owner or local authority. Customers are responsible for obtaining these permits before their event. Mermaidalay cannot install the inflatable without the required authorization."
    },
    {
      question: "What happens if it rains?",
      answer: "Safety comes first. If severe weather is forecast, we offer one complimentary reschedule within 12 months, subject to availability."
    },
    {
      question: "Are the inflatable pools clean?",
      answer: "Absolutely. Every inflatable, mermaid tail, and accessory is thoroughly cleaned and sanitized before every event."
    },
    {
      question: "Is adult supervision required?",
      answer: "Yes. Adult supervision is required at all times. Mermaid tails can reduce a child's ability to kick, balance, or stand up quickly. First-time users should be closely assisted, and children who are not confident swimmers should wear a U.S. Coast Guard-approved life jacket."
    },
    {
      question: "Are mermaid tails safe?",
      answer: "Mermaid tails are safe when used properly with adult supervision. Because the tail joins the legs together, it may reduce a child's ability to kick, balance, stand up quickly, or swim freely. They should only be used in shallow water with adult supervision at all times. Life jackets are strongly recommended for non-swimmers."
    },
    {
      question: "Can I add extra mermaid tails?",
      answer: "Yes! Additional mermaid tails can be added for $10 each during booking so more children can join the fun."
    },
    {
      question: "Can I customize my party?",
      answer: "Of course! Choose from exciting enhancements including: Photographer, Makeup artist, Mermaid tail extra ($10), Bubble machine ($75), Jewels ($50), Seashell throne ($50)."
    },
    {
      question: "How far do you travel?",
      answer: "We proudly serve San Jose, Sunnyvale, Mountain View, Cupertino, Los Altos and surrounding communities. Travel fees may apply outside our standard service area."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Cancellation more than 14 days before the event: 30% non-refundable deposit forfeited (from total package amount). Cancellation within 7 days of the event: No refund. Unsafe weather: One complimentary reschedule within 12 months, subject to availability. Permits: Customers are responsible for obtaining any required permits for public venues before the event. No-shows or inaccessible setup location: No refund."
    },
    {
      question: "Are you insured?",
      answer: "Yes. We carry business liability insurance to help ensure a safe and professional experience for your event."
    }
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
            <a href="/#top">Home</a>
            <a href="/#packages">Packages</a>
            <a href="/gallery">Gallery</a>
            <a href="/#service-areas">Locations</a>
            <a href="/about">About</a>
            <a href="/faq">FAQ</a>
            <a href="/contact">Contact Us</a>
            <button type="button" onClick={() => window.location.href = '/'} className="button primary" style={{padding: '8px 20px', fontSize: '14px', whiteSpace: 'nowrap'}}>Book Now</button>
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
                  <a href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</a>
                  <button type="button" onClick={() => { window.location.href = '/'; }} className="button primary" style={{width: '100%', marginTop: '8px'}}>Book Now</button>
              </div>
      </header>

  

      <section className="section">
        <div className="container">
          <div className="section-heading centered">
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} />
            <p className="eyebrow">Got Questions?</p>
            <h2>Everything you need to know</h2>
            <p style={{fontSize: '18px', maxWidth: '800px', margin: '24px auto 0', lineHeight: '1.6'}}>Find answers about our magical mermaid lagoon experiences, from setup and safety to customization options.</p>
          </div>
        </div>
      </section>

      <section className="section" style={{paddingTop: '40px'}}>
        <div className="container" style={{maxWidth: '900px'}}>
          <div style={{background: 'linear-gradient(135deg, rgba(255,240,248,0.5), rgba(224,251,255,0.5))', padding: '40px', borderRadius: '16px', marginBottom: '60px'}}>
            <h2 style={{marginTop: 0, marginBottom: '24px', color: '#173c50'}}>Water Depth & Safety Guidelines</h2>
            <p style={{marginBottom: '20px'}}>Our inflatable mermaid lagoon is <strong>15 ft × 15 ft</strong>, with a maximum water depth of <strong>2 feet</strong>. This shallow design ensures safety for children while providing plenty of space for magical fun.</p>
            <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '20px'}}>
              <thead>
                <tr style={{background: '#173c50', color: '#fff'}}>
                  <th style={{padding: '12px', textAlign: 'left', borderRadius: '8px 0 0 0'}}>Water Depth</th>
                  <th style={{padding: '12px', textAlign: 'left'}}>Best Age</th>
                  <th style={{padding: '12px', textAlign: 'left', borderRadius: '0 8px 0 0'}}>Typical Child Height</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{background: '#fff'}}>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>12 inches (1 ft)</td>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>2–5 years</td>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>Up to 3½ ft (107 cm)</td>
                </tr>
                <tr style={{background: '#fff0f8'}}>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>18 inches (1.5 ft)</td>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>4–8 years</td>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>About 3½–4½ ft (107–137 cm)</td>
                </tr>
                <tr style={{background: '#fff'}}>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>24 inches (2 ft)</td>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>6–12 years</td>
                  <td style={{padding: '12px', border: '1px solid #e0e0e0'}}>About 4–5½ ft (122–168 cm)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{background: '#fff0f8', padding: '40px', borderRadius: '16px', marginBottom: '60px', border: '3px solid #c8a4b1'}}>
            <h2 style={{marginTop: 0, marginBottom: '16px', color: '#d32f2f'}}>Mermaid Tail Safety Notice</h2>
            <h3 style={{color: '#173c50', fontSize: '20px', marginBottom: '16px'}}>Adult Supervision Required</h3>
            <p style={{marginBottom: '16px', lineHeight: '1.7'}}>Mermaid tails are designed for fun and imaginative play, but they can present a safety risk if not used properly. Because the tail joins the legs together, it may reduce a child's ability to kick, balance, stand up quickly, or swim freely, especially for first-time users.</p>
            <h4 style={{color: '#173c50', marginBottom: '12px'}}>For the safety of all participants:</h4>
            <ul style={{lineHeight: '1.8', marginBottom: '16px'}}>
              <li>An adult must supervise children at all times while wearing a mermaid tail</li>
              <li>First-time users should be closely assisted until they become comfortable moving safely in the water</li>
              <li>Mermaid tails should only be used in shallow water and in accordance with the recommended water depth and age guidelines</li>
              <li>Children who are not confident swimmers or who cannot swim should wear a U.S. Coast Guard-approved life jacket while using a mermaid tail</li>
              <li>No diving, running, rough play, or jumping while wearing a mermaid tail</li>
              <li>If a child feels uncomfortable, tired, or has difficulty moving, the mermaid tail should be removed immediately</li>
            </ul>
            <p style={{background: '#d32f2f', color: '#fff', padding: '16px', borderRadius: '8px', fontWeight: '600'}}>⚠️ Warning: Mermaid tails are not flotation devices and do not prevent drowning. Adult supervision is required at all times. Mermaidalay strongly recommends that children use mermaid tails only under the direct supervision of a responsible adult, particularly during their first experience.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{maxWidth: '900px'}}>
          <h2 style={{marginBottom: '32px', textAlign: 'center', fontSize: '32px', color: '#00a0b8'}}>Frequently Asked Questions</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '80px'}}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                borderRadius: '12px',
                background: openFAQIndex === index ? 'rgba(224,251,255,0.3)' : 'rgba(255,255,255,0.6)',
                border: '2px solid ' + (openFAQIndex === index ? '#00a0b8' : 'rgba(200,164,177,0.3)'),
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}>
                <button
                  onClick={() => setOpenFAQIndex(openFAQIndex === index ? null : index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '16px',
                    fontFamily: 'inherit'
                  }}
                >
                  <h3 style={{
                    margin: 0,
                    fontSize: '18px',
                    fontFamily: 'var(--font-fredoka), sans-serif',
                    fontWeight: '600',
                    color: openFAQIndex === index ? '#00a0b8' : '#173c50',
                    flex: 1
                  }}>{faq.question}</h3>
                  <span style={{
                    fontSize: '24px',
                    color: '#00a0b8',
                    transition: 'transform 0.3s ease',
                    transform: openFAQIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                    flexShrink: 0
                  }}>▼</span>
                </button>
                {openFAQIndex === index && (
                  <div style={{
                    padding: '0 24px 24px',
                    lineHeight: '1.8',
                    fontSize: '16px',
                    color: '#173c50',
                    animation: 'fadeIn 0.3s ease'
                  }}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="container" style={{textAlign: 'center', maxWidth: '800px'}}>
          <h2 style={{marginBottom: '16px'}}>Still have questions?</h2>
          <p style={{fontSize: '18px', lineHeight: '1.6', marginBottom: '32px'}}>We'd love to help! Contact us today and we'll make sure your child's mermaid party is truly unforgettable. 🧜‍♀️✨</p>
          <a href="/contact" className="button" style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: '#006b7d',
            color: '#fff',
            borderRadius: '999px',
            fontFamily: 'var(--font-fredoka), sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            border: 'none',
            textDecoration: 'none',
            cursor: 'pointer'
          }}>Get in Touch</a>
        </div>
      </section>

      <footer>
        <div className="container footer-grid">
          <div>
            <div className="brand footer-brand brand-wordmark"><img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" /></div>
            <p>Premium inflatable mermaid lagoon experiences for unforgettable parties and events.</p>
          </div>
          <div><strong>Explore</strong><a href="/#packages">Packages</a><a href="/gallery">Gallery</a><a href="/about">About</a><a href="/faq">FAQ</a></div>
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
