// Booking Service - Handles all Firebase booking operations

import { collection, addDoc, getDocs, updateDoc, doc, query, where, orderBy, Timestamp } from 'firebase/firestore';
import { db } from './firebase';

/**
 * Submit a new booking to Firebase
 */
export async function submitBooking(bookingData) {
  // Check if Firebase is configured
  if (!db) {
    console.error('Firebase not configured');
    return {
      success: false,
      error: 'Booking system not configured. Please contact the administrator.',
    };
  }

  try {
    const isPaid = bookingData.paymentStatus === 'paid';
    const booking = {
      ...bookingData,
      createdAt: Timestamp.now(),
      status: isPaid ? 'paid' : 'pending', // pending, confirmed, paid, completed, cancelled
      bookingNumber: generateBookingNumber(),
    };

    const docRef = await addDoc(collection(db, 'bookings'), booking);
    
    // Send confirmation email
    await sendBookingConfirmation(booking);
    
    return {
      success: true,
      bookingId: docRef.id,
      bookingNumber: booking.bookingNumber,
    };
  } catch (error) {
    console.error('Error submitting booking:', error);
    return {
      success: false,
      error: error.message,
    };
  }
}

/**
 * Get all bookings (admin only)
 */
export async function getAllBookings() {
  // Check if Firebase is configured
  if (!db) {
    console.warn('Firebase not configured, returning empty bookings list');
    return [];
  }

  try {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(bookingsQuery);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        eventDate: doc.data().eventDate, // Keep as string for display
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return [];
  }
}

/**
 * Get bookings for a specific date
 */
export async function getBookingsForDate(date) {
  // Check if Firebase is configured
  if (!db) {
    console.warn('Firebase not configured, returning empty bookings list');
    return [];
  }

  try {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('eventDate', '==', date),
      where('status', 'in', ['pending', 'confirmed', 'paid'])
    );
    
    const querySnapshot = await getDocs(bookingsQuery);
    const bookings = [];
    
    querySnapshot.forEach((doc) => {
      bookings.push({
        id: doc.id,
        ...doc.data(),
      });
    });
    
    return bookings;
  } catch (error) {
    console.error('Error fetching bookings for date:', error);
    return [];
  }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(bookingId, status) {
  // Check if Firebase is configured
  if (!db) {
    console.error('Firebase not configured');
    return { success: false, error: 'Booking system not configured' };
  }

  try {
    const bookingRef = doc(db, 'bookings', bookingId);
    await updateDoc(bookingRef, {
      status,
      updatedAt: Timestamp.now(),
    });
    return { success: true };
  } catch (error) {
    console.error('Error updating booking:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Find a booking by Stripe payment intent ID
 */
export async function findBookingByStripePaymentIntentId(paymentIntentId) {
  if (!db) {
    console.error('Firebase not configured');
    return null;
  }

  try {
    const bookingsQuery = query(
      collection(db, 'bookings'),
      where('stripePaymentIntentId', '==', paymentIntentId)
    );

    const querySnapshot = await getDocs(bookingsQuery);
    if (querySnapshot.empty) {
      return null;
    }

    const bookingDoc = querySnapshot.docs[0];
    return {
      id: bookingDoc.id,
      ...bookingDoc.data(),
    };
  } catch (error) {
    console.error('Error finding booking by Stripe payment intent ID:', error);
    return null;
  }
}

/**
 * Update a booking after Stripe confirms payment
 */
export async function markBookingPaidFromStripe(paymentIntent) {
  if (!db) {
    console.error('Firebase not configured');
    return { success: false, error: 'Booking system not configured' };
  }

  try {
    const booking = await findBookingByStripePaymentIntentId(paymentIntent.id);

    if (!booking) {
      return { success: false, error: 'Booking not found for payment intent' };
    }

    const bookingRef = doc(db, 'bookings', booking.id);
    const card = paymentIntent.charges?.data?.[0]?.payment_method_details?.card;

    await updateDoc(bookingRef, {
      status: 'paid',
      paymentStatus: 'paid',
      payment: {
        lastFour: card?.last4 || booking.payment?.lastFour || '',
        brand: card?.brand || booking.payment?.brand || '',
        processed: true,
      },
      stripePaymentIntentStatus: paymentIntent.status,
      stripePaymentIntentId: paymentIntent.id,
      updatedAt: Timestamp.now(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error syncing Stripe payment to booking:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Check if a time slot is available
 */
export async function isTimeSlotAvailable(date, time) {
  const bookings = await getBookingsForDate(date);
  return !bookings.some(booking => booking.eventTime === time);
}

/**
 * Generate unique booking number
 */
function generateBookingNumber() {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `ML-${timestamp}-${random}`;
}

/**
 * Send booking confirmation email
 */
async function sendBookingConfirmation(booking) {
  try {
    // Call the API route to send email
    const response = await fetch('/api/send-confirmation', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(booking),
    });
    
    if (!response.ok) {
      console.error('Failed to send confirmation email');
    }
  } catch (error) {
    console.error('Error sending confirmation email:', error);
  }
}
