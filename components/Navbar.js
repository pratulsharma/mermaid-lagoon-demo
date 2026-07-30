'use client';

import { useState } from 'react';

export default function Navbar({ currentPage = '', onBookNowClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleBookNowClick = () => {
    if (onBookNowClick) {
      onBookNowClick();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <a className="brand brand-wordmark" href="/" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
          <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
          <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" style={{ height: 'auto', width: 'auto', maxHeight: '36px' }} />
        </a>
        <div className="nav-links">
          <a href="/" style={currentPage === 'home' ? {fontWeight: '700'} : {}}>Home</a>
          <a href="/#packages">Packages</a>
          <a href="/gallery" style={currentPage === 'gallery' ? {fontWeight: '700'} : {}}>Gallery</a>
          <a href="/#service-areas">Locations</a>
          <a href="/about" style={currentPage === 'about' ? {fontWeight: '700'} : {}}>About</a>
          <a href="/faq" style={currentPage === 'faq' ? {fontWeight: '700'} : {}}>FAQ</a>
          <a href="/contact" style={currentPage === 'contact' ? {fontWeight: '700'} : {}}>Contact Us</a>
          <button type="button" onClick={handleBookNowClick} className="button primary" style={{ padding: '8px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}>Book Now</button>
          <a href="/admin/login" style={{fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit'}}>⚙️</a>
        </div>
        <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="/" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'home' ? {fontWeight: '700'} : {}}>Home</a>
        <a href="/#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
        <a href="/gallery" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'gallery' ? {fontWeight: '700'} : {}}>Gallery</a>
        <a href="/#service-areas" onClick={() => setMobileMenuOpen(false)}>Locations</a>
        <a href="/about" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'about' ? {fontWeight: '700'} : {}}>About</a>
        <a href="/faq" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'faq' ? {fontWeight: '700'} : {}}>FAQ</a>
        <a href="/contact" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'contact' ? {fontWeight: '700'} : {}}>Contact Us</a>
        <button type="button" onClick={handleBookNowClick} className="button primary" style={{ width: '100%', marginTop: '8px' }}>Book Now</button>
      </div>
    </header>
  );
}
