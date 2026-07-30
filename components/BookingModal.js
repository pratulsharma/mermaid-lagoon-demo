'use client';

import { useState, useMemo, useRef } from 'react';

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
  ['Photographer', 350],
  ['Makeup artist', 200],
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

export default function BookingModal({ isOpen, onClose }) {
  const [selectedPackage, setSelectedPackage] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [serviceArea, setServiceArea] = useState('san-jose');
  const [bookingStep, setBookingStep] = useState('form');
  const [bookingDetails, setBookingDetails] = useState({ name: '', email: '', eventDate: '', eventTime: '', eventCity: '' });
  const [paymentInfo, setPaymentInfo] = useState({ cardNumber: '', expiry: '', cvv: '', zipCode: '' });
  const [signature, setSignature] = useState('');
  const [waiver, setWaiver] = useState({ name: '', phone: '', email: '', address: '', eventDate: '', photoRelease: 'no', agree: false, signedDate: new Date().toISOString().slice(0, 10) });

  const minDate = useMemo(() => new Date().toISOString().split('T')[0], []);
  const total = useMemo(() => packages[selectedPackage].price + selectedAddOns.reduce((sum, index) => sum + addOns[index][1], 0), [selectedPackage, selectedAddOns]);
  const toggleAddOn = (index) => setSelectedAddOns((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);

  const resetBooking = () => {
    setBookingStep('form');
    setBookingDetails({ name: '', email: '', eventDate: '', eventTime: '', eventCity: '' });
    setPaymentInfo({ cardNumber: '', expiry: '', cvv: '', zipCode: '' });
    setSignature('');
    setWaiver({ name: '', phone: '', email: '', address: '', eventDate: '', photoRelease: 'no', agree: false, signedDate: new Date().toISOString().slice(0, 10) });
    setSelectedPackage(1);
    setSelectedAddOns([]);
  };

  const proceedToWaiver = () => {
    if (!bookingDetails.name || !bookingDetails.email || !bookingDetails.eventDate || !bookingDetails.eventTime || !bookingDetails.eventCity) {
      alert('Please fill in all fields');
      return;
    }
    const selectedDate = new Date(bookingDetails.eventDate + 'T' + bookingDetails.eventTime);
    const now = new Date();
    if (selectedDate < now) {
      alert('Please select a future date and time');
      return;
    }
    setWaiver({ ...waiver, eventDate: bookingDetails.eventDate });
    setBookingStep('waiver');
  };

  const signWaiver = () => {
    if (!waiver.agree || !signature) {
      alert('Please sign the waiver and agree to the terms');
      return;
    }
    setBookingStep('payment');
  };

  const processPayment = () => {
    console.log('Processing payment...', { bookingDetails, paymentInfo, total });
    setBookingStep('success');
  };

  if (!isOpen) return null;

  return (
    <div className="booking-modal-backdrop" role="dialog" aria-modal="true" aria-label="Book your experience" onClick={() => { onClose(); resetBooking(); }}>
      <div className="booking-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" type="button" aria-label="Close booking" onClick={() => { onClose(); resetBooking(); }}>✕</button>

        {bookingStep === 'form' && <>
          <div className="booking-modal-header">
            <p className="eyebrow">Build your experience</p>
            <h2>Get an instant party estimate.</h2>
          </div>
          <div className="booking-modal-content">
            <fieldset><legend>1. Choose your service area</legend><div className="choice-list"><label className={`choice ${serviceArea === 'san-jose' ? 'selected' : ''}`}><input type="radio" name="modal-area" checked={serviceArea === 'san-jose'} onChange={() => setServiceArea('san-jose')} /><span><strong>San Jose</strong><small>Core service area</small></span></label><label className={`choice ${serviceArea === 'sunnyvale' ? 'selected' : ''}`}><input type="radio" name="modal-area" checked={serviceArea === 'sunnyvale'} onChange={() => setServiceArea('sunnyvale')} /><span><strong>Sunnyvale</strong><small>Extended area</small></span></label><label className={`choice ${serviceArea === 'mountain-view' ? 'selected' : ''}`}><input type="radio" name="modal-area" checked={serviceArea === 'mountain-view'} onChange={() => setServiceArea('mountain-view')} /><span><strong>Mountain View</strong><small>Extended area</small></span></label></div></fieldset>
            <fieldset><legend>2. Choose day</legend><div><input type="date" min={minDate} value={bookingDetails.eventDate} onChange={(e) => setBookingDetails({ ...bookingDetails, eventDate: e.target.value })} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '16px'}} /></div></fieldset>
            <fieldset><legend>3. Choose time</legend><div><input type="time" value={bookingDetails.eventTime} onChange={(e) => setBookingDetails({ ...bookingDetails, eventTime: e.target.value })} style={{width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #c8a4b1', fontSize: '16px'}} /></div></fieldset>
            <fieldset><legend>4. Choose a package</legend><div className="choice-list">{packages.map((item, index) => <label className={`choice ${selectedPackage === index ? 'selected' : ''}`} key={item.name}><input type="radio" name="modal-package" checked={selectedPackage === index} onChange={() => setSelectedPackage(index)} /><span><strong>{item.name}</strong><small>{item.hours} hours · ${item.price}</small></span></label>)}</div></fieldset>
            <fieldset><legend>5. Add extra magic</legend><div className="choice-list compact">{addOns.map(([name, price], index) => <label className={`choice ${selectedAddOns.includes(index) ? 'selected' : ''}`} key={name}><input type="checkbox" name={`modal-addon-${index}`} checked={selectedAddOns.includes(index)} onChange={() => toggleAddOn(index)} /><span><strong>{name}</strong><small>+${price}</small></span></label>)}</div></fieldset>
            <div className="contact-fields">
              <label>Name *<input type="text" placeholder="Your name" value={bookingDetails.name} onChange={(e) => setBookingDetails({ ...bookingDetails, name: e.target.value })} /></label>
              <label>Email *<input type="email" placeholder="you@example.com" value={bookingDetails.email} onChange={(e) => setBookingDetails({ ...bookingDetails, email: e.target.value })} /></label>
              <label>Event city *<input type="text" placeholder="Fremont, CA" value={bookingDetails.eventCity} onChange={(e) => setBookingDetails({ ...bookingDetails, eventCity: e.target.value })} /></label>
            </div>
            <div className="estimate-card"><span>Estimated total</span><strong>${total.toLocaleString()}</strong></div>
            <button type="button" className="button primary full" onClick={proceedToWaiver} disabled={!bookingDetails.name || !bookingDetails.email || !bookingDetails.eventDate || !bookingDetails.eventTime || !bookingDetails.eventCity}>Continue to Waiver</button>
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
                <p><strong>Date & Time:</strong> {bookingDetails.eventDate} at {bookingDetails.eventTime}</p>
                <p><strong>Location:</strong> {bookingDetails.eventCity}</p>
                <p><strong>Total Paid:</strong> ${total.toLocaleString()}</p>
              </div>
              <p style={{ marginBottom: '20px' }}>A confirmation email has been sent to {bookingDetails.email}. We'll contact you 48 hours before your event to confirm setup details.</p>
              <p style={{ fontSize: '14px', color: '#666', marginBottom: '20px' }}>
                <strong>Demo Note:</strong> This is a front-end demonstration. In production, this would connect to a payment processor (Stripe, Square), send confirmation emails, and create calendar events.
              </p>
              <button className="button primary full" type="button" onClick={() => { onClose(); resetBooking(); }}>Close</button>
            </div>
          </div>
        </>}
      </div>
    </div>
  );
}
