// API Route to send booking confirmation emails using Resend

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const booking = await request.json();
    
    // Check if Resend API key is configured
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY not configured, skipping email');
      return NextResponse.json({ success: true, message: 'Email skipped (no API key)' });
    }

    // Send email using Resend
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Mermaidalay <bookings@mermaidalay.com>',
        to: [booking.email],
        subject: `Booking Confirmed - ${booking.bookingNumber}`,
        html: generateEmailHTML(booking),
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend API error:', error);
      return NextResponse.json({ success: false, error }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json({ success: true, emailId: data.id });

  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

function generateEmailHTML(booking) {
  const { name, email, bookingNumber, eventDate, eventTime, packageName, addOns, total, serviceArea } = booking;
  
  return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #5eb9c7 0%, #d97b9f 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9f9f9; padding: 30px 20px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #5eb9c7; }
    .detail-row { display: flex; padding: 8px 0; border-bottom: 1px solid #eee; }
    .detail-label { font-weight: 600; width: 140px; color: #666; }
    .detail-value { flex: 1; }
    .total { font-size: 24px; font-weight: bold; color: #00a0b8; text-align: center; margin: 20px 0; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .button { display: inline-block; background: #00a0b8; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🧜‍♀️ Booking Confirmed!</h1>
      <p style="font-size: 18px; margin: 10px 0 0;">Thank you for choosing Mermaidalay</p>
    </div>
    
    <div class="content">
      <p>Hi ${name},</p>
      
      <p>Your mermaid lagoon experience is confirmed! We can't wait to bring the magic to your event.</p>
      
      <div class="booking-details">
        <h3 style="margin-top: 0; color: #00a0b8;">Booking Details</h3>
        
        <div class="detail-row">
          <div class="detail-label">Booking #:</div>
          <div class="detail-value"><strong>${bookingNumber}</strong></div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Date:</div>
          <div class="detail-value">${new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Time:</div>
          <div class="detail-value">${eventTime}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Package:</div>
          <div class="detail-value">${packageName}</div>
        </div>
        
        ${addOns && addOns.length > 0 ? `
        <div class="detail-row">
          <div class="detail-label">Add-ons:</div>
          <div class="detail-value">${addOns.join(', ')}</div>
        </div>
        ` : ''}
        
        <div class="detail-row">
          <div class="detail-label">Service Area:</div>
          <div class="detail-value">${serviceArea}</div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">Email:</div>
          <div class="detail-value">${email}</div>
        </div>
      </div>
      
      <div class="total">
        Total: $${total?.toLocaleString() || '0'}
      </div>
      
      <h3 style="color: #00a0b8;">What's Next?</h3>
      <ul>
        <li>We'll contact you <strong>48 hours before</strong> your event to confirm setup details</li>
        <li>Please ensure the event space is ready and accessible</li>
        <li>Have a water source nearby for filling the lagoon</li>
        <li>Prepare for an unforgettable mermaid experience! 🧜‍♀️✨</li>
      </ul>
      
      <p>If you have any questions or need to make changes, please reply to this email or call us at (555) 123-4567.</p>
      
      <center>
        <a href="https://mermaid2.vercel.app" class="button">Visit Our Website</a>
      </center>
    </div>
    
    <div class="footer">
      <p><strong>Mermaidalay</strong><br>
      Swim Your Dream<br>
      San Jose, CA | (555) 123-4567<br>
      hello@mermaidalay.com</p>
      
      <p style="font-size: 12px; color: #999;">
        Booking Reference: ${bookingNumber}<br>
        Questions? Reply to this email anytime.
      </p>
    </div>
  </div>
</body>
</html>
  `;
}
