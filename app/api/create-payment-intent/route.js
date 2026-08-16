import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export const runtime = 'nodejs';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripe = stripeSecretKey ? new Stripe(stripeSecretKey) : null;

export async function POST(request) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { success: false, error: 'STRIPE_SECRET_KEY is not configured' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const amount = Number(body?.amount);

    if (!Number.isInteger(amount) || amount < 50) {
      return NextResponse.json(
        { success: false, error: 'Invalid payment amount' },
        { status: 400 }
      );
    }

    const booking = body?.booking || {};

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: body?.currency || 'usd',
      automatic_payment_methods: { enabled: true },
      description: `Mermaidalay booking for ${booking.name || 'customer'}`,
      metadata: {
        name: booking.name || '',
        email: booking.email || '',
        eventDate: booking.eventDate || '',
        eventTime: booking.eventTime || '',
        packageName: booking.packageName || '',
        serviceArea: booking.serviceArea || '',
        bookingTotal: String(body?.total || amount / 100),
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}