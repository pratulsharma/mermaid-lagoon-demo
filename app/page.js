'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSiteSettings, applySettingsStyle } from '../lib/useSettings';
import Navbar from '../components/Navbar';
import BookingModal from '../components/BookingModal';

const packages = [
  { 
    name: 'Mermaid Splash', 
    price: 750, 
    hours: 4, 
    features: ['3 Seashell chairs', '10 Mermaid tails'], 
    image: '/images/lagoon-kids.png',
    color: '#5eb9c7',
    bgColor: 'rgba(94, 185, 199, 0.1)'
  },
  { 
    name: 'Deluxe Mermaid Package', 
    price: 900, 
    hours: 6, 
    popular: true, 
    features: ['4 Seashell chairs', '15 Mermaid tails', 'Jewels'], 
    image: '/images/lagoon-adventure.jpg',
    color: '#d97b9f',
    bgColor: 'rgba(217, 123, 159, 0.1)'
  },
  { 
    name: 'Luxury Mermaid Experience', 
    price: 1250, 
    hours: 8, 
    features: ['5 Seashell chairs', '20+ Mermaid tails', 'Jewels', 'Bubble machine'], 
    image: '/images/lagoon-product.png',
    color: '#9b7ba8',
    bgColor: 'rgba(155, 123, 168, 0.1)'
  }
];

const addOns = [
  ['Mermaid tail extra', 10],
  ['Bubble machine', 75],
  ['Jewels', 50],
  ['Seashell throne', 50]
];

export default function Home() {
  const { settings } = useSiteSettings();
  const [showSplash, setShowSplash] = useState(true); // Always true on initial render to prevent hydration mismatch
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [videoOpen, setVideoOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);

  // Check if user has visited before (client-side only, after hydration)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem('mermaidalay_visited');
    if (hasVisited) {
      setShowSplash(false);
    }
  }, []);

  useEffect(() => {
    if (settings) {
      applySettingsStyle(settings);
    }
  }, [settings]);

  useEffect(() => {
    if (showSplash) {
      sessionStorage.setItem('mermaidalay_visited', 'true');
      const timer = setTimeout(() => {
        dismissSplash();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  // Check for #booking hash and open BookingModal
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash === '#booking') {
      // Wait for splash to dismiss if showing
      const timer = setTimeout(() => {
        setBookingOpen(true);
      }, showSplash ? 3500 : 100);
      return () => clearTimeout(timer);
    }
  }, [showSplash]);

  const dismissSplash = () => {
    setSplashLeaving(true);
    window.setTimeout(() => setShowSplash(false), 1300);
  };

  const total = useMemo(() => packages[selectedPackage].price + selectedAddOns.reduce((sum, index) => sum + addOns[index][1], 0), [selectedPackage, selectedAddOns]);
  const toggleAddOn = (index) => setSelectedAddOns((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);

  // Handle Book Now click - open Firebase booking modal
  const handleBookNowClick = () => {
    setBookingOpen(true);
  };

  if (!settings) {
    return null;
  }

  return (
    <main>
      {videoOpen && <div className="video-modal-backdrop" role="dialog" aria-modal="true" aria-label="Watch the magic" onClick={() => setVideoOpen(false)}>
        <div className="video-modal-inner" onClick={e => e.stopPropagation()}>
          <button className="video-modal-close" type="button" aria-label="Close video" onClick={() => setVideoOpen(false)}>✕</button>
          <video className="video-modal-player" autoPlay controls playsInline muted>
            <source src="/videos/cinematic-vertical-reel.mp4" type="video/mp4" />
          </video>
        </div>
      </div>}
      {showSplash && <div className={`brand-splash ${splashLeaving ? 'is-leaving' : ''}`} role="dialog" aria-label="Welcome to Mermaidalay">
        <div className="splash-rays" aria-hidden="true" />
        <div className="splash-bubbles" aria-hidden="true"><i /><i /><i /><i /><i /><i /></div>
        <div className="splash-content">
          <img className="splash-mermaid" src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay mermaid emblem" />
          <img className="splash-wordmark" src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" />
          <p>Swim your dream!</p>
          <button type="button" onClick={dismissSplash}>Enter the lagoon</button>
        </div>
      </div>}
      <Navbar currentPage="home" onBookNowClick={handleBookNowClick} />

      <section className="hero" id="top">
        <div className="hero-bubbles" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">California's magical mobile lagoon experience</p>
            <h1>{settings.content.heroTitle}<br /><span style={{color: '#2191a5'}}>Become a mermaid.</span></h1>
            <p className="hero-text">More than a party—it's an immersive adventure. Mermaidalay delivers premium inflatable lagoons, sparkling mermaid tails, enchanting ocean-inspired décor, and hassle-free setup, transforming ordinary venues into extraordinary destinations for unforgettable celebrations.
            </p>
            <div className="hero-actions"><button type="button" className="button primary" onClick={handleBookNowClick}>Plan my party</button><button type="button" className="button secondary" onClick={() => setVideoOpen(true)}>Watch the magic</button></div>
          </div>
          <div className="hero-art"><img src="/images/lagoon-kids.png" alt="Children enjoying the Mermaidalay inflatable lagoon" /></div>
        </div>
      </section>

      <section className="stats-strip"><div className="container stats-grid"><div><span>immersive lagoon</span><strong>225 sq ft.</strong></div><div><span>packages from</span><strong>$750</strong></div><div><span>tails included</span><strong>10–25</strong></div><div><span>launch market</span><strong>California</strong></div></div></section>

      <section className="section" id="experience"><div className="container">
        <div className="section-heading split-heading"><div><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{ width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain' }} /><p className="eyebrow">More than a rental</p><h2>A complete fantasy world, brought to your event.</h2></div><p>From the pirate ship and castle to shell thrones, crowns, pearls and colorful tails, every part of the experience is designed to create a premium, immersive celebration.</p></div>
        <div className="story-grid">
          <img src="/images/mermaidalay-mermaid-emblem2.png" alt="Mermaidalay lagoon with castle, pirate ship, slides and shell seats" />
          <div className="story-cards" style={{marginBottom: '80px'}}>
            <article style={{ backgroundImage: 'url(/images/seep3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,240,248,0.3)', backdropFilter: 'blur(2px)', borderRadius: '12px' }}></div><div style={{ position: 'relative', zIndex: 1 }}><h3 style={{ color: '#00a0b8', fontWeight: '700' }}>Mermaid Lagoons Collections</h3><p style={{ color: '#173c50', fontWeight: '600' }}>• Coral Cove (Active Now)<br />• Sirens Cove (Coming Soon)<br />• Atlantis (Coming Soon)</p></div></article>
            <article style={{ backgroundImage: 'url(/images/seep2.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,240,248,0.3)', backdropFilter: 'blur(2px)', borderRadius: '12px' }}></div><div style={{ position: 'relative', zIndex: 1 }}><h3 style={{ color: '#00a0b8', fontWeight: '700' }}>Mermaid transformation</h3><p style={{ color: '#1d4d67', fontWeight: '600' }}>Wearable tails, crowns, pearl jewelry, shells and imaginative role-play accessories.</p></div></article>
            <article style={{ backgroundImage: 'url(/images/seep3.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,240,248,0.3)', backdropFilter: 'blur(2px)', borderRadius: '12px' }}></div><div style={{ position: 'relative', zIndex: 1 }}><h3 style={{ color: '#00a0b8', fontWeight: '700' }}>Effortless hosting</h3><p style={{ color: '#173c50', fontWeight: '600' }}>Delivery, installation, styling and breakdown handled for you.</p></div></article>
            <article style={{ backgroundImage: 'url(/images/seep4.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,240,248,0.3)', backdropFilter: 'blur(2px)', borderRadius: '12px' }}></div><div style={{ position: 'relative', zIndex: 1 }}><h3 style={{ color: '#00a0b8', fontWeight: '700' }}>Memories built in</h3><p style={{ color: '#173c50', fontWeight: '600' }}>A unique experience creating everlasting memories and magical moments—a dream come true.</p></div></article>
          </div>
        </div>
      </div></section>

      {settings.sections.showServiceAreas && (
        <section className="section service-areas-section" id="service-areas"><div className="container"><div className="section-heading centered"><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} /><p className="eyebrow"></p><h2>Now Serving</h2><p>Currently available in San Jose, Sunnyvale, Mountain View, Cupertino, Los Altos and surrounding areas. Expanding to more regions soon.</p></div><div className="service-locations-list" style={{marginBottom: '80px'}}><div className="location-badge">📍 San Jose (Core)</div><div className="location-badge">📍 Sunnyvale</div><div className="location-badge">📍 Mountain View</div><div className="location-badge">📍 Cupertino</div><div className="location-badge">📍 Los Altos</div><div className="location-badge coming-soon">🔜 More arriving soon</div></div></div></section>
      )}

      {settings.sections.showPackages && (
      <section className="section packages-section" id="packages"><div className="container">
          <div className="section-heading centered"><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', margin: '0 auto 16px', display: 'block', objectFit: 'contain'}} /><p className="eyebrow">Choose your splash</p><h2>Choose Your Mermaid Adventure.</h2><p>Clear starting prices with optional enhancements.</p></div>
        <div className="package-grid" style={{marginBottom: '80px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px'}}>
          {packages.map((item, index) => (
            <article 
              key={item.name}
              style={{
                position: 'relative',
                backgroundImage: `url(/images/seep${index === 0 ? 4 : index + 1}.jpg)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                borderRadius: '24px',
                padding: '40px 28px',
                border: `3px solid ${item.color}`,
                boxShadow: `0 8px 32px ${item.color}40, inset 0 1px 0 rgba(255,255,255,0.5)`,
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
                overflow: 'visible',
                display: 'flex',
                flexDirection: 'column',
                height: '560px'
              }}
              onClick={() => { setSelectedPackage(index); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0) scale(1)'}
            >
              {/* Seashell background overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `linear-gradient(135deg, ${item.bgColor} 0%, rgba(255,240,248,0.96) 100%)`,
                backdropFilter: 'blur(1px)',
                borderRadius: '24px',
                zIndex: 0
              }} />
              {/* Decorative corner embellishments */}
              <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', fontSize: '32px', filter: `drop-shadow(0 2px 4px ${item.color}80)`, zIndex: 2 }}>🐚</div>
              <div style={{ position: 'absolute', top: '24px', left: '16px', fontSize: '20px', opacity: 0.6, zIndex: 2 }}>🪸</div>
              <div style={{ position: 'absolute', top: '24px', right: '16px', fontSize: '20px', opacity: 0.6, zIndex: 2 }}>🪸</div>
              
              {/* Title */}
              <h3 style={{
                fontFamily: 'var(--font-fredoka)',
                fontSize: '18px',
                fontWeight: '700',
                color: item.color,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                marginBottom: '20px',
                marginTop: '4px',
                position: 'relative',
                zIndex: 1,
                textShadow: '0 1px 2px rgba(255,255,255,0.8)',
                background: 'rgba(255, 255, 255, 0.9)',
                padding: '8px 20px',
                borderRadius: '20px',
                display: 'inline-block',
                boxShadow: `0 2px 8px ${item.color}30`
              }}>
                {item.name}
              </h3>
              
              {/* Circular image */}
              <div style={{
                width: '160px',
                height: '160px',
                margin: '0 auto 20px',
                borderRadius: '50%',
                overflow: 'hidden',
                border: `4px solid ${item.color}`,
                boxShadow: `0 8px 24px ${item.color}50, inset 0 2px 8px rgba(0,0,0,0.1)`,
                background: 'white',
                position: 'relative',
                zIndex: 1
              }}>
                <img 
                  src={item.image} 
                  alt={item.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              {/* Features list */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '20px',
                textAlign: 'left',
                padding: '0 16px',
                flex: '1',
                position: 'relative',
                zIndex: 1
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#173c50', fontWeight: '700', textShadow: '0 1px 1px rgba(255,255,255,0.8)' }}>
                  <span style={{color: item.color, fontSize: '18px'}}>⏱️</span>
                  <span>{item.hours} HOURS</span>
                </div>
                {item.features.map((feature, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#173c50', fontWeight: '700', textShadow: '0 1px 1px rgba(255,255,255,0.8)' }}>
                    <span style={{color: item.color, fontSize: '18px'}}>🐚</span>
                    <span>{feature.toUpperCase()}</span>
                  </div>
                ))}
              </div>
              
              {/* Price badge */}
              <div style={{
                background: `linear-gradient(135deg, ${item.color} 0%, ${item.color}dd 100%)`,
                color: 'white',
                padding: '16px 32px',
                borderRadius: '50px',
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: 'var(--font-fredoka)',
                boxShadow: `0 6px 20px ${item.color}60, inset 0 2px 0 rgba(255,255,255,0.3)`,
                margin: '0 auto',
                display: 'inline-block',
                position: 'relative',
                zIndex: 1
              }}>
                ${item.price.toLocaleString()}
              </div>
              
              {/* Bottom decoration */}
              <div style={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)', fontSize: '20px', opacity: 0.4, zIndex: 2 }}>✨</div>
            </article>
          ))}
        </div>
      </div></section>
      )}

      <section className="section tails-section"><div className="container tail-grid" style={{marginBottom: '80px'}}><div><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain'}} /><p className="eyebrow">Choose your shimmer</p><h2>Mermaid tails and treasures for every guest.</h2><p>Colorful tail options plus crowns, pearls, shell props and treasure accessories help every child create a distinct mermaid look.</p></div><img src="/images/tail-collection.png" alt="Colorful mermaid tail collection with crowns and pearl accessories" /></div></section>

      {settings.sections.showGallery && (
      <section className="section gallery-section" id="gallery"><div className="container">
          <div className="section-heading split-heading"><div><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain'}} /><p className="eyebrow">Designed to delight</p><h2>A fantasy world delivered to your backyard.</h2></div><p>Birthday celebrations, schools, hotels, resorts, community events, baby showers and corporate family days.</p></div>
        <div className="gallery-grid" style={{marginBottom: '80px'}}><figure className="gallery-wide"><img src="/images/lagoon-adventure.jpg" alt="Mermaidalay branded lagoon adventure" /></figure><figure><img src="/images/mermaid-throne.png" alt="Child wearing a pink mermaid tail seated in a shell throne" /></figure><figure><img src="/images/treasure-shell.png" alt="Shell filled with mermaid crowns, pearls and treasures" /></figure><figure><img src="/images/logo-jewels.png" alt="Mermaidalay logo surrounded by crowns and pearls" /></figure><figure><img src="/images/hero-poster.jpeg" alt="Mermaid Lagoon promotional poster" /></figure></div>
      </div></section>
      )}

      {settings.sections.showReels && (
      <section className="section reel-section" id="reels"><div className="container">
        <div className="section-heading"><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain'}} /><p className="eyebrow">Demo reels</p><h2>See the lagoon come to life.</h2></div>
        <div className="reel-grid" style={{marginBottom: '80px'}}>
            <figure><video controls playsInline preload="metadata" poster="/images/lagoon-kids.png" muted><source src="/videos/use_the_inflatable_pool_make.mp4" type="video/mp4" /></video><figcaption>Backyard lagoon experience</figcaption></figure>
        </div>
      </div></section>
      )}


      <footer><div className="container footer-grid"><div><div className="brand footer-brand brand-wordmark"><img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay" /></div><p>Premium inflatable mermaid lagoon experiences for unforgettable parties and events.</p></div><div><strong>Explore</strong><a href="#packages">Packages</a><a href="/gallery">Gallery</a><a href="/about">About</a><a href="/faq">FAQ</a></div><div><strong>Legal</strong><a href="/privacy">Privacy Policy</a><a href="/terms">Terms & Conditions</a><a href="/legal/mermaidalay-waiver.pdf" target="_blank" rel="noreferrer">Waiver PDF</a></div></div><div className="container footer-bottom">© 2026 Mermaidalay. Demo website.</div></footer>

      {/* Firebase Booking Modal */}
      <BookingModal 
        isOpen={bookingOpen} 
        onClose={() => setBookingOpen(false)} 
      />
    </main>
  );
}
