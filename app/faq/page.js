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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('mermaidalay_visited', 'true');
    }
  }, []);
  
  const faqs = [
    {
      question: "What is included in each party package?",
      answer: "Each package includes the inflatable mermaid lagoon, water setup, mermaid tails, and everything listed in the selected package. Higher-tier packages include additional decorations, themed experiences, and premium features."
    },
    {
      question: "What ages are Mermaid parties best for?",
      answer: "Our experiences are designed primarily for children ages 4–12, but older children and even adults can enjoy the magic too!"
    },
    {
      question: "How much space is required?",
      answer: "We typically recommend a flat outdoor area measuring approximately 25 ft × 25 ft or larger, depending on the selected package. If you're unsure, simply send us a photo of your yard and we'll help determine the best setup."
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
      question: "Can the party be held at a park?",
      answer: "Absolutely! Many parks are great locations. Please note that some parks require permits and access to electricity or generators. We're happy to help you determine what's needed."
    },
    {
      question: "What happens if it rains?",
      answer: "Safety comes first. If severe weather is forecast, we'll work with you to reschedule your event at no additional charge whenever possible."
    },
    {
      question: "Are the inflatable pools clean?",
      answer: "Absolutely. Every inflatable, mermaid tail, and accessory is thoroughly cleaned and sanitized before every event."
    },
    {
      question: "Is adult supervision required?",
      answer: "Yes. An adult must supervise children at all times while using the inflatable lagoon and participating in water activities."
    },
    {
      question: "Can I add extra mermaid tails?",
      answer: "Yes! Additional mermaid tails can be added during booking so more children can join the fun."
    },
    {
      question: "Can I customize my party?",
      answer: "Of course! Choose from exciting enhancements including: Professional mermaid performer, Professional photography, Balloon arches, Bubble machines, Face painting, Additional decorations, Extra mermaid tails."
    },
    {
      question: "How far do you travel?",
      answer: "We proudly serve the San Jose area and surrounding communities. Travel fees may apply outside our standard service area."
    },
    {
      question: "How do I reserve my party?",
      answer: "Simply choose your package, customize your experience, submit your information, and we'll contact you to confirm availability and finalize your booking."
    },
    {
      question: "Is a deposit required?",
      answer: "Yes. A deposit is required to reserve your event date. The remaining balance is due before or on the day of your event, according to your booking agreement."
    },
    {
      question: "What is your cancellation policy?",
      answer: "Deposits are generally non-refundable, but we understand plans change. Depending on notice and availability, we'll do our best to reschedule your event."
    },
    {
      question: "Are you insured?",
      answer: "Yes. We carry business liability insurance to help ensure a safe and professional experience for your event."
    },
    {
      question: "Can adults use the lagoon?",
      answer: "Our inflatable lagoons are designed primarily for children. Please contact us if you're planning an event that includes older participants so we can recommend the best option."
    },
    {
      question: "How do I contact Mermaidalay?",
      answer: "Use the booking form on our website or contact us directly by phone or email. We'll be happy to answer any questions and help plan your magical celebration."
    }
  ];

  return (
    <main>
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand brand-wordmark" href="/#top" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
            <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" />
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
        </nav>
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

      <section className="section">
        <div className="container" style={{maxWidth: '900px'}}>
          <div style={{display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '80px'}}>
            {faqs.map((faq, index) => (
              <div key={index} style={{
                padding: '32px',
                borderRadius: '16px',
                background: 'rgba(255,255,255,0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(224,251,255,0.4)'
              }}>
                <h3 style={{
                  marginBottom: '16px',
                  fontSize: '20px',
                  fontFamily: 'var(--font-fredoka), sans-serif'
                }}>{faq.question}</h3>
                <p style={{
                  lineHeight: '1.8',
                  fontSize: '16px',
                  margin: 0
                }}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section founder-section">
        <div className="container" style={{textAlign: 'center', maxWidth: '800px'}}>
          <h2 style={{marginBottom: '16px'}}>Still have questions?</h2>
          <p style={{fontSize: '18px', lineHeight: '1.6', marginBottom: '32px'}}>We'd love to help! Contact us today and we'll make sure your child's mermaid party is truly unforgettable. 🧜‍♀️✨</p>
          <button type="button" onClick={() => setContactOpen(true)} className="button" style={{
            display: 'inline-block',
            padding: '16px 32px',
            background: '#006b7d',
            color: '#fff',
            borderRadius: '999px',
            fontFamily: 'var(--font-fredoka), sans-serif',
            fontWeight: 600,
            fontSize: '18px',
            border: 'none',
            cursor: 'pointer'
          }}>Get in Touch</button>
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
