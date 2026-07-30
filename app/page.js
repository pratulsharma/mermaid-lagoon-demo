'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useSiteSettings, applySettingsStyle } from '../lib/useSettings';

const packages = [
  { name: 'Mermaid Splash', price: 750, hours: 4, features: ['Inflatable lagoon', 'Water included', '10 mermaid tails', 'Setup & breakdown'] },
  { name: 'Deluxe Mermaid Party', price: 900, hours: 5, popular: true, features: ['Lagoon + pirate ship', 'Coral decorations', '15 mermaid tails', 'Party music'] },
  { name: 'Luxury Mermaid Experience', price: 1250, hours: 6, features: ['Full themed lagoon', 'Mermaid throne', 'Bubble machine', 'Photography area', '25 mermaid tails'] }
];

const addOns = [
  ['Photographer', 350, 'https://example.com/photographer'],
  ['Makeup artist', 200, 'https://example.com/makeup'],
  ['Mermaid tail extra', 10],
  ['Bubble machine', 75],
  ['Jewels', 50],
  ['Seashell throne', 50]
];

function SignaturePad({ onChange }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);

  const point = (event) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const touch = event.touches?.[0];
    return {
      x: ((touch?.clientX ?? event.clientX) - rect.left) * (canvas.width / rect.width),
      y: ((touch?.clientY ?? event.clientY) - rect.top) * (canvas.height / rect.height)
    };
  };

  const start = (event) => {
    event.preventDefault();
    drawing.current = true;
    const ctx = canvasRef.current.getContext('2d');
    const p = point(event);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };

  const move = (event) => {
    if (!drawing.current) return;
    event.preventDefault();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const p = point(event);
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#173c50';
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    onChange(canvas.toDataURL('image/png'));
  };

  const stop = () => { drawing.current = false; };
  const clear = () => {
    const canvas = canvasRef.current;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    onChange('');
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="signature-canvas"
        width="900"
        height="220"
        aria-label="Draw electronic signature"
        onMouseDown={start}
        onMouseMove={move}
        onMouseUp={stop}
        onMouseLeave={stop}
        onTouchStart={start}
        onTouchMove={move}
        onTouchEnd={stop}
      />
      <button type="button" className="text-button" onClick={clear}>Clear signature</button>
    </div>
  );
}

export default function Home() {
  const { settings } = useSiteSettings();
  const [showSplash, setShowSplash] = useState(true); // Always true on initial render to prevent hydration mismatch
  const [splashLeaving, setSplashLeaving] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [serviceArea, setServiceArea] = useState('san-jose');
  const [waiverOpen, setWaiverOpen] = useState(false);
  const [waiverSigned, setWaiverSigned] = useState(false);
  const [signature, setSignature] = useState('');
  const [waiver, setWaiver] = useState({ name: '', phone: '', email: '', address: '', eventDate: '', photoRelease: 'no', agree: false, signedDate: new Date().toISOString().slice(0, 10) });
  const [contactOpen, setContactOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState('form'); // 'form', 'waiver', 'payment', 'success'
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', eventDate: '', eventCity: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '', zipCode: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

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

  // Search content data
  const searchableContent = useMemo(() => [
    { type: 'Package', title: 'Mermaid Splash', content: '4 hour experience, inflatable lagoon, water included, 10 mermaid tails, setup & breakdown', price: '$750', link: '#packages' },
    { type: 'Package', title: 'Deluxe Mermaid Party', content: '5 hour experience, lagoon + pirate ship, coral decorations, 15 mermaid tails, party music', price: '$900', link: '#packages' },
    { type: 'Package', title: 'Luxury Mermaid Experience', content: '6 hour experience, full themed lagoon, mermaid throne, bubble machine, photography area, 25 mermaid tails', price: '$1250', link: '#packages' },
    { type: 'Add-on', title: 'Photographer', content: 'Professional photographer to capture your magical moments', price: '$350', link: '#booking' },
    { type: 'Add-on', title: 'Makeup artist', content: 'Professional makeup artist for mermaid transformations', price: '$200', link: '#booking' },
    { type: 'Add-on', title: 'Bubble machine', content: 'Add magical bubbles to your lagoon experience', price: '$75', link: '#booking' },
    { type: 'FAQ', title: 'Pool Dimensions', content: 'Our lagoon is 15 feet × 15 feet (15ft × 15ft)', link: '/faq' },
    { type: 'FAQ', title: 'Water Safety', content: 'Water depth safety requirements: 12 inches for ages 3-5, 18 inches for ages 6-8, 24 inches for ages 9+', link: '/faq' },
    { type: 'FAQ', title: 'Extra Mermaid Tail', content: 'Additional mermaid tails available for $10 each', link: '/faq' },
    { type: 'FAQ', title: 'Cancellation Policy', content: 'Cancellations 14+ days in advance forfeit 30% deposit. Within 7 days of event: no refund', link: '/faq' },
    { type: 'Experience', title: 'Mermaid Lagoons Collections', content: 'Coral Cove (Active Now), Sirens Cove (Coming Soon), Atlantis (Coming Soon)', link: '#experience' },
    { type: 'Experience', title: 'Mermaid transformation', content: 'Wearable tails, crowns, pearl jewelry, shells and imaginative role-play accessories', link: '#experience' },
    { type: 'Location', title: 'Service Areas', content: 'San Jose, Sunnyvale, Mountain View, Cupertino, Los Altos and surrounding areas', link: '#service-areas' },
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
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [searchOpen]);

  const dismissSplash = () => {
    setSplashLeaving(true);
    window.setTimeout(() => setShowSplash(false), 1300);
  };

  const total = useMemo(() => packages[selectedPackage].price + selectedAddOns.reduce((sum, index) => sum + addOns[index][1], 0), [selectedPackage, selectedAddOns]);
  const toggleAddOn = (index) => setSelectedAddOns((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);

  const proceedToWaiver = () => {
    // Validate booking form fields
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.eventDate || !bookingDetails.eventCity) {
      alert('Please fill in all required fields');
      return;
    }
    // Pre-fill waiver with booking details
    setWaiver({ ...waiver, name: bookingDetails.name, email: bookingDetails.email, eventDate: bookingDetails.eventDate });
    setBookingStep('waiver');
  };

  const signWaiver = () => {
    if (!waiver.name || !waiver.email || !waiver.eventDate || !waiver.agree || !signature) {
      alert('Please complete all waiver fields and provide your signature');
      return;
    }
    setWaiverSigned(true);
    setBookingStep('payment');
  };

  const processPayment = () => {
    if (!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv || !paymentInfo.zipCode) {
      alert('Please fill in all payment fields');
      return;
    }
    // Simulate payment processing
    setBookingStep('success');
  };

  const resetBooking = () => {
    setBookingStep('form');
    setSubmitted(false);
    setWaiverSigned(false);
    setSignature('');
    setBookingDetails({ name: '', email: '', eventDate: '', eventCity: '' });
    setPaymentInfo({ cardNumber: '', expiry: '', cvv: '', zipCode: '' });
  };

  const downloadReceipt = () => {
    const text = `MERMAIDALAY ELECTRONIC WAIVER ACKNOWLEDGEMENT\n\nPrinted name: ${waiver.name}\nEmail: ${waiver.email}\nPhone: ${waiver.phone}\nEvent address: ${waiver.address}\nEvent date: ${waiver.eventDate}\nSigned date: ${waiver.signedDate}\nPhoto/video release: ${waiver.photoRelease}\n\nThe signer acknowledged the Mermaidalay Online Rental Agreement & Liability Waiver and supplied an electronic signature in the website demo.\n\nProduction note: connect this form to a secure database, timestamping service, email delivery, and audit log before accepting live customer signatures.`;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mermaidalay-waiver-${waiver.name.replace(/\s+/g, '-').toLowerCase() || 'signed'}.txt`;
    link.click();
    URL.revokeObjectURL(url);
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
      {bookingOpen && <div className="booking-modal-backdrop" role="dialog" aria-modal="true" aria-label="Book your experience" onClick={() => { setBookingOpen(false); resetBooking(); }}>
        <div className="booking-modal" onClick={e => e.stopPropagation()}>
          <button className="modal-close" type="button" aria-label="Close booking" onClick={() => { setBookingOpen(false); resetBooking(); }}>✕</button>

          {bookingStep === 'form' && <>
            <div className="booking-modal-header">
              <p className="eyebrow">Build your experience</p>
              <h2>Get an instant party estimate.</h2>
            </div>
            <div className="booking-modal-content">
              <fieldset><legend>1. Choose your service area</legend><div className="choice-list"><label className={`choice ${serviceArea === 'san-jose' ? 'selected' : ''}`}><input type="radio" name="modal-area" checked={serviceArea === 'san-jose'} onChange={() => setServiceArea('san-jose')} /><span><strong>San Jose</strong><small>Core service area</small></span></label><label className={`choice ${serviceArea === 'sunnyvale' ? 'selected' : ''}`}><input type="radio" name="modal-area" checked={serviceArea === 'sunnyvale'} onChange={() => setServiceArea('sunnyvale')} /><span><strong>Sunnyvale</strong><small>Extended area</small></span></label><label className={`choice ${serviceArea === 'mountain-view' ? 'selected' : ''}`}><input type="radio" name="modal-area" checked={serviceArea === 'mountain-view'} onChange={() => setServiceArea('mountain-view')} /><span><strong>Mountain View</strong><small>Extended area</small></span></label></div></fieldset>
              <fieldset><legend>2. Choose a package</legend><div className="choice-list">{packages.map((item, index) => <label className={`choice ${selectedPackage === index ? 'selected' : ''}`} key={item.name}><input type="radio" name="modal-package" checked={selectedPackage === index} onChange={() => setSelectedPackage(index)} /><span><strong>{item.name}</strong><small>{item.hours} hours · ${item.price}</small></span></label>)}</div></fieldset>
              <fieldset><legend>3. Add extra magic</legend><div className="choice-list compact">{addOns.map(([name, price], index) => <label className={`choice ${selectedAddOns.includes(index) ? 'selected' : ''}`} key={name}><input type="checkbox" name={`modal-addon-${index}`} checked={selectedAddOns.includes(index)} onChange={() => toggleAddOn(index)} /><span><strong>{name}</strong><small>+${price}</small></span></label>)}</div></fieldset>
              <div className="contact-fields">
                <label>Name *<input type="text" placeholder="Your name" value={bookingDetails.name} onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })} /></label>
                <label>Email *<input type="email" placeholder="you@example.com" value={bookingDetails.email} onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })} /></label>
                <label>Event date *<input type="date" value={bookingDetails.eventDate} onChange={(e) => setBookingDetails({ ...bookingDetails, eventDate: e.target.value })} /></label>
                <label>Event city *<input type="text" placeholder="Fremont, CA" value={bookingDetails.eventCity} onChange={(e) => setBookingDetails({ ...bookingDetails, eventCity: e.target.value })} /></label>
              </div>
              <div className="estimate-card"><span>Estimated total</span><strong>${total.toLocaleString()}</strong></div>
              <button type="button" className="button primary full" onClick={proceedToWaiver} disabled={!bookingDetails.name || !bookingDetails.email || !bookingDetails.eventDate || !bookingDetails.eventCity}>Continue to Waiver</button>
            </div>
          </>}

          {bookingStep === 'waiver' && <>
            <div className="booking-modal-header">
              <p className="eyebrow">Step 2 of 3</p>
              <h2>Sign Liability Waiver</h2>
            </div>
            <div className="booking-modal-content">
              <div className="waiver-text" style={{ maxHeight: '300px', overflow: 'auto', padding: '20px', background: '#f9f9f9', borderRadius: '8px', marginBottom: '20px', fontSize: '14px', lineHeight: '1.6' }}>
                <h3 style={{ marginTop: 0 }}>Mermaidalay Rental Agreement & Liability Waiver</h3>
                <p><strong>PLEASE READ CAREFULLY BEFORE SIGNING</strong></p>
                <p>This Agreement is entered into by and between Mermaidalay ("Company") and the undersigned participant or legal guardian ("Renter").</p>
                <p><strong>1. Rental Terms:</strong> Renter agrees to rent the inflatable mermaid lagoon and accessories for the date and duration specified.</p>
                <p><strong>2. Assumption of Risk:</strong> Renter acknowledges that use of inflatable equipment involves inherent risks including but not limited to: injury from falls, collisions, or improper use.</p>
                <p><strong>3. Supervision:</strong> Renter agrees to provide adequate adult supervision at all times during use.</p>
                <p><strong>4. Safety Rules:</strong> No shoes, sharp objects, food, or drinks in the inflatable. Maximum capacity must be observed.</p>
                <p><strong>5. Liability Release:</strong> Renter releases Company from all liability for injuries or damages arising from use of the equipment.</p>
                <p><strong>6. Indemnification:</strong> Renter agrees to indemnify and hold harmless the Company from any claims or damages.</p>
              </div>
              <div className="waiver-fields" style={{ display: 'grid', gap: '16px', marginBottom: '20px' }}>
                <label>Full Name *<input type="text" value={waiver.name} onChange={(e) => setWaiver({ ...waiver, name: e.target.value })} /></label>
                <label>Email *<input type="email" value={waiver.email} onChange={(e) => setWaiver({ ...waiver, email: e.target.value })} /></label>
                <label>Phone<input type="tel" value={waiver.phone} onChange={(e) => setWaiver({ ...waiver, phone: e.target.value })} placeholder="(555) 123-4567" /></label>
                <label>Event Address<input type="text" value={waiver.address} onChange={(e) => setWaiver({ ...waiver, address: e.target.value })} placeholder="123 Main St" /></label>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <p style={{ fontWeight: 600, marginBottom: '8px' }}>Electronic Signature *</p>
                <SignaturePad onChange={setSignature} />
              </div>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '20px' }}>
                <input type="checkbox" checked={waiver.agree} onChange={(e) => setWaiver({ ...waiver, agree: e.target.checked })} style={{ marginTop: '4px' }} />
                <span>I have read and agree to the terms of this waiver and certify that I am authorized to sign on behalf of all participants.</span>
              </label>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" className="button secondary" onClick={() => setBookingStep('form')}>Back</button>
                <button type="button" className="button primary" style={{ flex: 1 }} onClick={signWaiver} disabled={!waiver.name || !waiver.email || !waiver.eventDate || !waiver.agree || !signature}>Sign & Continue to Payment</button>
              </div>
            </div>
          </>}

          {bookingStep === 'payment' && <>
            <div className="booking-modal-header">
              <p className="eyebrow">Step 3 of 3</p>
              <h2>Payment Information</h2>
            </div>
            <div className="booking-modal-content">
              <div className="estimate-card" style={{ marginBottom: '24px' }}>
                <span>Total Amount Due</span>
                <strong>${total.toLocaleString()}</strong>
                <small>{packages[selectedPackage].name} + {selectedAddOns.length} add-on{selectedAddOns.length === 1 ? '' : 's'}</small>
              </div>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px', textAlign: 'center' }}>
                <strong>Demo Mode:</strong> This is a demonstration payment form. No actual charges will be processed.
              </p>
              <div style={{ display: 'grid', gap: '16px' }}>
                <label>Card Number *<input type="text" placeholder="1234 5678 9012 3456" maxLength="19" value={paymentInfo.cardNumber} onChange={(e) => setPaymentInfo({ ...paymentInfo, cardNumber: e.target.value })} /></label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <label>Expiry *<input type="text" placeholder="MM/YY" maxLength="5" value={paymentInfo.expiry} onChange={(e) => setPaymentInfo({ ...paymentInfo, expiry: e.target.value })} /></label>
                  <label>CVV *<input type="text" placeholder="123" maxLength="4" value={paymentInfo.cvv} onChange={(e) => setPaymentInfo({ ...paymentInfo, cvv: e.target.value })} /></label>
                  <label>ZIP *<input type="text" placeholder="12345" maxLength="5" value={paymentInfo.zipCode} onChange={(e) => setPaymentInfo({ ...paymentInfo, zipCode: e.target.value })} /></label>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button type="button" className="button secondary" onClick={() => setBookingStep('waiver')}>Back</button>
                <button type="button" className="button primary" style={{ flex: 1 }} onClick={processPayment} disabled={!paymentInfo.cardNumber || !paymentInfo.expiry || !paymentInfo.cvv || !paymentInfo.zipCode}>Complete Booking</button>
              </div>
            </div>
          </>}

          {bookingStep === 'success' && <>
            <div className="booking-modal-header">
              <p className="eyebrow">Booking Confirmed</p>
              <h2>You're all set! 🎉</h2>
            </div>
            <div className="booking-modal-content">
              <div className="success-state">
                <div className="success-icon">✓</div>
                <h3>Booking Confirmed</h3>
                <div style={{ textAlign: 'left', background: '#f9f9f9', padding: '20px', borderRadius: '12px', marginBottom: '20px' }}>
                  <p><strong>Package:</strong> {packages[selectedPackage].name}</p>
                  <p><strong>Date:</strong> {bookingDetails.eventDate}</p>
                  <p><strong>Location:</strong> {bookingDetails.eventCity}</p>
                  <p><strong>Total Paid:</strong> ${total.toLocaleString()}</p>
                </div>
                <p style={{ marginBottom: '20px' }}>A confirmation email has been sent to {bookingDetails.email}. We'll contact you 48 hours before your event to confirm setup details.</p>
                <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                  <strong>Demo Note:</strong> This is a front-end demonstration. In production, this would connect to a payment processor (Stripe, Square), send confirmation emails, and create calendar events.
                </p>
                <button className="button primary full" type="button" onClick={() => { setBookingOpen(false); resetBooking(); }}>Close</button>
              </div>
            </div>
          </>}
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
      <header className="nav-wrap">
        <nav className="nav container">
          <a className="brand brand-wordmark" href="#top" style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <img src="/images/mermaidalay-mermaid-emblem.png" alt="Mermaidalay Emblem" style={{width: '48px', height: '48px', objectFit: 'contain'}} />
            <img src="/images/mermaidalay-wordmark.png" alt="Mermaidalay — Swim Your Dream" style={{ height: 'auto', width: 'auto', maxHeight: '36px' }} />
          </a>
          <div className="nav-links">
            <a href="#top">Home</a><a href="#packages">Packages</a><a href="/gallery">Gallery</a><a href="#service-areas">Locations</a><a href="/about">About</a><a href="/faq">FAQ</a>
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
            <a href="/admin/login" style={{ fontSize: '12px', opacity: 0.5, textDecoration: 'none', color: 'inherit' }}>⚙️</a>
            <div className="nav-contact">
              <a href="tel:+15551234567" className="nav-phone">📞 (555) 123-4567</a>
              <button type="button" onClick={() => setContactOpen(true)} className="nav-email" style={{background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', padding: 0}}>✉️ hello@mermaidalay.com</button>
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
          <a href="#top" onClick={() => setMobileMenuOpen(false)}>Home</a>
          <a href="#packages" onClick={() => setMobileMenuOpen(false)}>Packages</a>
          <a href="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#service-areas" onClick={() => setMobileMenuOpen(false)}>Locations</a>
          <a href="/about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="/faq" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
          <button type="button" onClick={() => { setContactOpen(true); setMobileMenuOpen(false); }}>Contact Us</button>
          <a href="tel:+15551234567">📞 (555) 123-4567</a>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="hero-bubbles" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">California's magical mobile lagoon experience</p>
            <h1>{settings.content.heroTitle}<br />Become a mermaid.</h1>
            <div className="hero-actions"><a href="#booking" className="button primary" onClick={(e) => { e.preventDefault(); setBookingOpen(true); }}>Plan my party</a><button type="button" className="button secondary" onClick={() => setVideoOpen(true)}>Watch the magic</button></div>
          </div>
          <div className="hero-art"><img src="/images/lagoon-kids.png" alt="Children enjoying the Mermaidalay inflatable lagoon" /></div>
        </div>
      </section>

      <section className="stats-strip"><div className="container stats-grid"><div><span>immersive lagoon</span><strong>15 ft × 15 ft</strong></div><div><span>packages from</span><strong>$750</strong></div><div><span>tails included</span><strong>10–25</strong></div><div><span>launch market</span><strong>California</strong></div></div></section>

      <section className="section" id="experience"><div className="container">
        <div className="section-heading split-heading"><div><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{ width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain' }} /><p className="eyebrow">More than a rental</p><h2>A complete fantasy world, brought to your event.</h2></div><p>From the pirate ship and castle to shell thrones, crowns, pearls and colorful tails, every part of the experience is designed to create a premium, immersive celebration.</p></div>
        <div className="story-grid">
          <img src="/images/mermaidalay-mermaid-emblem2.png" alt="Mermaidalay lagoon with castle, pirate ship, slides and shell seats" />
          <div className="story-cards" style={{marginBottom: '80px'}}>
            <article style={{ backgroundImage: 'url(/images/seep1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}><div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,240,248,0.3)', backdropFilter: 'blur(2px)', borderRadius: '12px' }}></div><div style={{ position: 'relative', zIndex: 1 }}><h3 style={{ color: '#00a0b8', fontWeight: '700' }}>Mermaid Lagoons Collections</h3><p style={{ color: '#173c50', fontWeight: '600' }}>• Coral Cove (Active Now)<br />• Sirens Cove (Coming Soon)<br />• Atlantis (Coming Soon)</p></div></article>
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
        <div className="package-grid" style={{marginBottom: '80px'}}>{packages.map((item, index) => <article className={`package-card ${item.popular ? 'popular' : ''}`} key={item.name}>{item.popular && <div className="popular-label">Most popular</div>}<p className="package-kicker">{item.hours} hour experience</p><h3>{item.name}</h3><div className="price"><span>$</span>{item.price}</div><ul>{item.features.map((feature) => <li key={feature}>✓ {feature}</li>)}</ul><button type="button" onClick={() => { setSelectedPackage(index); document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' }); }}>Select package</button></article>)}</div>
      </div></section>
      )}

      <section className="section booking-section" id="booking"><div className="container booking-grid" style={{marginBottom: '80px'}}>
        <div className="booking-copy"><img src="/images/mermaidalay-mermaid-emblem.png" alt="" style={{ width: '60px', height: '60px', marginBottom: '16px', display: 'block', objectFit: 'contain' }} /><p className="eyebrow">Build your experience</p><h2>Personalize Your Party by adding more magic</h2><p>Select a package above and click below to start your booking. Our 3-step process includes package selection, liability waiver, and secure payment.</p><div className="estimate-card"><span>Estimated experience total</span><strong>${total.toLocaleString()}</strong><small>{packages[selectedPackage].name} + {selectedAddOns.length} add-on{selectedAddOns.length === 1 ? '' : 's'}</small></div><button type="button" className="button primary" onClick={() => setBookingOpen(true)}>Start Booking</button></div>
        <div className="booking-form" style={{ display: 'flex', flexDirection: 'column', gap: '24px', padding: '32px', backgroundImage: 'url(/images/seep1.jpg)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', borderRadius: '16px' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(255,240,248,0.3)', backdropFilter: 'blur(2px)', borderRadius: '16px' }}></div>
          <div style={{position: 'relative', zIndex: 1}}>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#173c50', fontWeight: '700' }}>Quick Package Builder</h3>
            <p style={{ fontSize: '14px', color: '#173c50', marginBottom: '20px', fontWeight: '600' }}>Preview your selection before booking</p>
          </div>
          <div style={{position: 'relative', zIndex: 1}}>
            <fieldset><legend style={{color: '#173c50', fontWeight: '700'}}>1. Choose Location</legend><div className="choice-list"><label className={`choice ${serviceArea === 'san-jose' ? 'selected' : ''}`}><input type="radio" name="area" checked={serviceArea === 'san-jose'} onChange={() => setServiceArea('san-jose')} /><span><strong>San Jose</strong><small>Core service area</small></span></label><label className={`choice ${serviceArea === 'sunnyvale' ? 'selected' : ''}`}><input type="radio" name="area" checked={serviceArea === 'sunnyvale'} onChange={() => setServiceArea('sunnyvale')} /><span><strong>Sunnyvale</strong><small>Extended area</small></span></label><label className={`choice ${serviceArea === 'mountain-view' ? 'selected' : ''}`}><input type="radio" name="area" checked={serviceArea === 'mountain-view'} onChange={() => setServiceArea('mountain-view')} /><span><strong>Mountain View</strong><small>Extended area</small></span></label></div></fieldset>
            <fieldset><legend style={{color: '#173c50', fontWeight: '700'}}>2. Choose Day</legend><div><input type="date" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '16px'}} /></div></fieldset>
            <fieldset><legend style={{color: '#173c50', fontWeight: '700'}}>3. Choose Time</legend><div><input type="time" style={{width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '16px'}} /></div></fieldset>
            <fieldset><legend style={{color: '#173c50', fontWeight: '700'}}>4. Choose Lagoon</legend><div className="choice-list"><label className="choice selected"><input type="radio" name="lagoon" checked readOnly /><span><strong>Coral Cove</strong><small>Currently active</small></span></label><label className="choice" style={{opacity: 0.6}}><input type="radio" name="lagoon" disabled /><span><strong>Sirens Cove</strong><small>Coming soon</small></span></label><label className="choice" style={{opacity: 0.6}}><input type="radio" name="lagoon" disabled /><span><strong>Atlantis</strong><small>Coming soon</small></span></label></div></fieldset>
            <fieldset><legend style={{color: '#173c50', fontWeight: '700'}}>5. Choose Package</legend><div className="choice-list">{packages.map((item, index) => <label className={`choice ${selectedPackage === index ? 'selected' : ''}`} key={item.name}><input type="radio" name="package" checked={selectedPackage === index} onChange={() => setSelectedPackage(index)} /><span><strong>{item.name}</strong><small>{item.hours} hours · ${item.price}</small></span></label>)}</div></fieldset>
            <fieldset><legend style={{color: '#173c50', fontWeight: '700'}}>Add Extra Magic</legend><div className="choice-list compact">{addOns.map((item, index) => {
              const name = item[0];
              const price = item[1];
              const link = item[2];
              return <label className={`choice ${selectedAddOns.includes(index) ? 'selected' : ''}`} key={name}><input type="checkbox" checked={selectedAddOns.includes(index)} onChange={() => toggleAddOn(index)} /><span><strong>{name}{link ? ' 🔗' : ''}</strong><small>+${price}</small></span></label>;
            })}</div></fieldset>
            <button type="button" className="button primary full" onClick={() => setBookingOpen(true)}>Continue to Booking →</button>
          </div>
        </div>
      </div></section>

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

      {waiverOpen && <div className="modal-backdrop" role="presentation"><section className="waiver-modal" role="dialog" aria-modal="true" aria-labelledby="waiver-title"><div className="modal-header"><div><p className="eyebrow">Online agreement</p><h2 id="waiver-title">Rental Agreement & Liability Waiver</h2></div><button className="close-button" type="button" onClick={() => setWaiverOpen(false)} aria-label="Close waiver">×</button></div>
        <div className="waiver-note">This demo reproduces the uploaded Mermaidalay waiver. For live use, have California counsel review it and connect signatures to secure storage, timestamps, document versioning and an audit trail.</div>
        <div className="waiver-fields"><label>Printed name *<input value={waiver.name} onChange={(e) => setWaiver({ ...waiver, name: e.target.value })} /></label><label>Phone<input value={waiver.phone} onChange={(e) => setWaiver({ ...waiver, phone: e.target.value })} /></label><label>Email *<input type="email" value={waiver.email} onChange={(e) => setWaiver({ ...waiver, email: e.target.value })} /></label><label>Event address<input value={waiver.address} onChange={(e) => setWaiver({ ...waiver, address: e.target.value })} /></label><label>Event date *<input type="date" value={waiver.eventDate} onChange={(e) => setWaiver({ ...waiver, eventDate: e.target.value })} /></label><label>Signature date<input type="date" value={waiver.signedDate} onChange={(e) => setWaiver({ ...waiver, signedDate: e.target.value })} /></label></div>
        <div className="waiver-text"><h3>Agreement</h3><p>By signing this Agreement, I confirm that I am at least 18 years old and have the authority to rent this equipment. If children participate, I certify that I am their parent or legal guardian or have permission to sign on their behalf.</p><p>I understand that use of Mermaidalay's inflatable pools, mermaid tails, accessories and water activities involves inherent risks, including slips, falls, drowning, property damage, serious injury, permanent disability or death. I voluntarily assume all risks associated with use of the rental equipment.</p><ul><li>Adult supervision is required at all times.</li><li>Mermaidalay does not provide lifeguards or childcare.</li><li>All participants must follow posted safety rules.</li><li>No diving, rough play, climbing, glass containers, alcohol, smoking, pets or sharp objects.</li><li>Equipment may not be moved, altered or misused after installation.</li><li>Equipment may not be used during high winds, lightning or other unsafe weather.</li></ul><p>I accept the equipment in good condition and agree to return it in the same condition, excluding normal wear and tear. I am responsible for damage caused by negligence, misuse, pets, sharp objects, burns, vandalism or failure to follow safety rules.</p><p>To the fullest extent permitted by California law, I release and hold harmless Mermaidalay, its owners, employees, contractors, affiliates and agents from claims, injuries, damages, losses, costs or liabilities arising from use of the rental equipment, except those resulting from gross negligence or willful misconduct. I agree to indemnify and defend Mermaidalay against claims arising from my event or the actions of guests or participants. Mermaidalay may postpone or cancel a rental because of unsafe weather or hazardous site conditions.</p><a href="/legal/mermaidalay-waiver.pdf" target="_blank" rel="noreferrer">Open the original two-page PDF</a></div>
        <fieldset className="photo-release"><legend>Optional photo & video release</legend><label><input type="radio" name="release" checked={waiver.photoRelease === 'yes'} onChange={() => setWaiver({ ...waiver, photoRelease: 'yes' })} /> Yes, I authorize promotional use.</label><label><input type="radio" name="release" checked={waiver.photoRelease === 'no'} onChange={() => setWaiver({ ...waiver, photoRelease: 'no' })} /> No, I do not authorize promotional use.</label></fieldset>
        <label className="agree-row"><input type="checkbox" checked={waiver.agree} onChange={(e) => setWaiver({ ...waiver, agree: e.target.checked })} /><span>I have read, understood and agree to the Rental Agreement, Liability Waiver, Assumption of Risk and Release of Liability. I understand that my electronic signature has the same intended effect as a handwritten signature.</span></label>
        <label className="signature-label">Electronic signature *</label><SignaturePad onChange={setSignature} />
        <div className="modal-actions"><button className="button secondary" type="button" onClick={() => setWaiverOpen(false)}>Cancel</button><button className="button primary" type="button" disabled={!waiver.name || !waiver.email || !waiver.eventDate || !waiver.agree || !signature} onClick={signWaiver}>Accept and sign</button></div>
      </section></div>}

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
