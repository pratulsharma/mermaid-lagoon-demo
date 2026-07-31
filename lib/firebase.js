// Firebase Configuration
// After creating your Firebase project, replace these values with your actual config

import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
};

// Check if Firebase is configured
const isConfigured = firebaseConfig.apiKey && firebaseConfig.projectId;

// Initialize Firebase only if configured
let app = null;
let db = null;
let auth = null;

if (isConfigured) {
  try {
    if (!getApps().length) {
      app = initializeApp(firebaseConfig);
    } else {
      app = getApps()[0];
    }
    db = getFirestore(app);
    auth = getAuth(app);
  } catch (error) {
    console.error('Firebase initialization error:', error);
  }
} else {
  console.warn('⚠️ Firebase not configured. Create .env.local file with your Firebase credentials.');
  console.warn('📖 See FIREBASE-SETUP.md for instructions.');
}

export { db, auth };
export default app;
