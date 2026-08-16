'use client';

import { useState, useEffect, useMemo } from 'react';

export default function Navbar({ currentPage = '', onBookNowClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchOpen, setSearchOpen] = useState(false);

    const handleBookNowClick = () => {
        if (onBookNowClick) {
            onBookNowClick(); // Call parent's book now handler
      } else if (typeof window !== 'undefined') {
          window.location.href = '/?booking=1';
        }
        setMobileMenuOpen(false);
    };
    const searchableContent = useMemo(() => [
        { type: 'Package', title: 'Mermaid Splash', content: '4 hour experience, inflatable lagoon, water included, 10 mermaid tails, setup & breakdown', price: '$750', link: '/#packages' },
        { type: 'Package', title: 'Deluxe Mermaid Party', content: '5 hour experience, lagoon + pirate ship, coral decorations, 15 mermaid tails, party music', price: '$900', link: '/#packages' },
        { type: 'Package', title: 'Luxury Mermaid Experience', content: '6 hour experience, full themed lagoon, mermaid throne, bubble machine, photography area, 25 mermaid tails', price: '$1250', link: '/#packages' },
        { type: 'Add-on', title: 'Bubble machine', content: 'Add magical bubbles to your lagoon experience', price: '$75', link: '/#booking' },
        { type: 'FAQ', title: 'Pool Dimensions', content: 'Our lagoon is 15 feet × 15 feet (15ft × 15ft)', link: '/faq' },
        { type: 'FAQ', title: 'Water Safety', content: 'Water depth safety requirements: 12 inches for ages 3-5, 18 inches for ages 6-8, 24 inches for ages 9+', link: '/faq' },
        { type: 'FAQ', title: 'Extra Mermaid Tail', content: 'Additional mermaid tails available for $10 each', link: '/faq' },
        { type: 'FAQ', title: 'Cancellation Policy', content: 'Cancellations 14+ days in advance forfeit 30% deposit. Within 7 days of event: no refund', link: '/faq' },
        { type: 'Experience', title: 'Mermaid Lagoons Collections', content: 'Coral Cove (Active Now), Sirens Cove (Coming Soon), Atlantis (Coming Soon)', link: '/#experience' },
        { type: 'Experience', title: 'Mermaid transformation', content: 'Wearable tails, crowns, pearl jewelry, shells and imaginative role-play accessories', link: '/#experience' },
        { type: 'Location', title: 'Service Areas', content: 'San Jose, Sunnyvale, Mountain View, Cupertino, Los Altos and surrounding areas', link: '/#service-areas' },
    ], []);

    // Filter search results
    const searchResults = useMemo(() => {
        if (!searchQuery.trim()) return [];
        const query = searchQuery.toLowerCase();
        return searchableContent.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.content.toLowerCase().includes(query) ||
            item.type.toLowerCase().includes(query)
        ).slice(0, 8); // Limit to 8 results
    }, [searchQuery, searchableContent]);

    // Handle search input
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
        setSearchOpen(true);
    };

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (searchOpen && !e.target.closest('.search-container')) {
                setSearchOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [searchOpen]);

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
          <a href="/contact" style={currentPage === 'contact' ? {fontWeight: '700'} : {}}>Contact</a>
          <a href="/faq" style={currentPage === 'faq' ? {fontWeight: '700'} : {}}>FAQ</a>
          <button type="button" onClick={handleBookNowClick} className="button primary" style={{ padding: '8px 20px', fontSize: '14px', whiteSpace: 'nowrap' }}>Book Now</button>
          <a href="/admin/login" style={{fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit'}}>⚙️</a>
                  <div className="search-container" style={{ position: 'relative' }}>
                      <input
                          type="search"
                          placeholder="Search..."
                          value={searchQuery}
                          onChange={handleSearchChange}
                          onFocus={() => searchQuery && setSearchOpen(true)}
                          className="search-input"
                          style={{
                              padding: '8px 12px 8px 32px',
                              borderRadius: '20px',
                              border: '2px solid #c8a4b1',
                              fontSize: '14px',
                              width: '180px',
                              outline: 'none',
                              transition: 'all 0.3s ease'
                          }}
                      />
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>🔍</span>
                      {searchOpen && searchQuery && (
                          <div className="search-results" style={{
                              position: 'absolute',
                              top: '100%',
                              right: 0,
                              marginTop: '8px',
                              background: 'white',
                              border: '2px solid #c8a4b1',
                              borderRadius: '12px',
                              boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                              width: '350px',
                              maxHeight: '400px',
                              overflowY: 'auto',
                              zIndex: 100
                          }}>
                              {searchResults.length > 0 ? (
                                  <div style={{ padding: '8px' }}>
                                      <div style={{ padding: '8px 12px', fontSize: '12px', fontWeight: '600', color: '#666', textTransform: 'uppercase' }}>Found {searchResults.length} result{searchResults.length === 1 ? '' : 's'}</div>
                                      {searchResults.map((result, idx) => (
                                          <a
                                              key={idx}
                                              href={result.link}
                                              onClick={() => { setSearchOpen(false); setSearchQuery(''); setMobileMenuOpen(false); }}
                                              style={{
                                                  display: 'block',
                                                  padding: '12px',
                                                  borderRadius: '8px',
                                                  textDecoration: 'none',
                                                  color: 'inherit',
                                                  transition: 'background 0.2s',
                                                  cursor: 'pointer'
                                              }}
                                              onMouseEnter={(e) => e.currentTarget.style.background = '#f0f0f0'}
                                              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                          >
                                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                                                  <strong style={{ fontSize: '14px', color: '#00a0b8' }}>{result.title}</strong>
                                                  {result.price && <span style={{ fontSize: '14px', fontWeight: '600', color: '#006b7d' }}>{result.price}</span>}
                                              </div>
                                              <div style={{ fontSize: '12px', color: '#666', marginBottom: '4px' }}>{result.content}</div>
                                              <div style={{ fontSize: '11px', color: '#999', textTransform: 'uppercase', fontWeight: '600' }}>{result.type}</div>
                                          </a>
                                      ))}
                                  </div>
                              ) : (
                                  <div style={{ padding: '24px', textAlign: 'center', color: '#666' }}>
                                      <div style={{ fontSize: '32px', marginBottom: '8px' }}>🔍</div>
                                      <p>No results found for "{searchQuery}"</p>
                                      <p style={{ fontSize: '13px', marginTop: '8px' }}>Try searching for packages, add-ons, FAQ, or locations</p>
                                  </div>
                              )}
                          </div>
                      )}
                  </div>
        </div>
        <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ padding: '12px 20px', position: 'relative' }}>
          <input
            type="search"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => searchQuery && setSearchOpen(true)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 36px',
              borderRadius: '20px',
              border: '2px solid #c8a4b1',
              fontSize: '15px',
              outline: 'none'
            }}
          />
          <span style={{ position: 'absolute', left: '32px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
        </div>
        {searchOpen && searchQuery && searchResults.length > 0 && (
          <div style={{ maxHeight: '200px', overflowY: 'auto', borderBottom: '1px solid #eee', marginBottom: '8px' }}>
            {searchResults.map((result, idx) => (
              <a
                key={idx}
                href={result.link}
                onClick={() => { setSearchOpen(false); setSearchQuery(''); setMobileMenuOpen(false); }}
                style={{
                  display: 'block',
                  padding: '12px 20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  borderBottom: '1px solid #f0f0f0'
                }}
              >
                <div style={{ fontWeight: '600', fontSize: '14px', color: '#00a0b8', marginBottom: '4px' }}>{result.title}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{result.content.substring(0, 60)}...</div>
              </a>
            ))}
          </div>
        )}
        <a href="/" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'home' ? {fontWeight: '700'} : {}}>Home</a>
        <a href="/#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
        <a href="/gallery" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'gallery' ? {fontWeight: '700'} : {}}>Gallery</a>
        <a href="/#service-areas" onClick={() => setMobileMenuOpen(false)}>Locations</a>
        <a href="/about" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'about' ? {fontWeight: '700'} : {}}>About</a>
        <a href="/contact" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'contact' ? {fontWeight: '700'} : {}}>Contact</a>
        <a href="/faq" onClick={() => setMobileMenuOpen(false)} style={currentPage === 'faq' ? {fontWeight: '700'} : {}}>FAQ</a>
        <button type="button" onClick={handleBookNowClick} className="button primary" style={{ width: '100%', marginTop: '8px' }}>Book Now</button>
      </div>
    </header>
  );
}
