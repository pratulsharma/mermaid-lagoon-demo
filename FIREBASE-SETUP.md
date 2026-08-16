# 🔥 Firebase Setup Guide

## Complete guide to set up Firebase backend for Mermaid Lagoon booking system

---

## Step 1: Install Firebase SDK

Once npm is working, run:
```bash
npm install firebase
```

If you get a 403 error, try:
```bash
npm cache clean --force
npm install firebase --registry=https://registry.npmjs.org/
```

Or try with yarn:
```bash
yarn add firebase
```

---

## Step 2: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Add project"** or **"Create a project"**
3. Project name: `mermaid-lagoon` (or your choice)
4. **Disable** Google Analytics (not needed for now)
5. Click **"Create project"**

---

## Step 3: Enable Firestore Database

1. In Firebase Console, click **"Firestore Database"** in left sidebar
2. Click **"Create database"**
3. Choose **"Start in production mode"** (we'll add rules next)
4. Select location: `us-central` (or closest to you)
5. Click **"Enable"**

---

## Step 4: Set Up Firestore Security Rules

1. In Firestore Database, click **"Rules"** tab
2. Replace the rules with this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Bookings - anyone can create, only admins can read/update
    match /bookings/{bookingId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    
    // Availability - anyone can read, only admins can write
    match /availability/{date} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Admin settings - only admins
    match /settings/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

---

## Step 5: Enable Email/Password Authentication

1. In Firebase Console, click **"Authentication"** in left sidebar
2. Click **"Get started"**
3. Click **"Email/Password"** under Sign-in providers
4. **Enable** the first option (Email/Password)
5. Click **"Save"**

---

## Step 6: Create Admin User

1. Still in Authentication, click **"Users"** tab
2. Click **"Add user"**
3. Email: `admin@mermaidalay.com` (or your email)
4. Password: Create a strong password
5. Click **"Add user"**

**Save these credentials!** You'll need them to log in to the admin portal.

---

## Step 7: Get Firebase Configuration

1. In Firebase Console, click the **gear icon** ⚙️ (Project settings)
2. Scroll down to **"Your apps"** section
3. Click the **web icon** `</>`
4. App nickname: `mermaid-lagoon-web`
5. **Don't** check "Firebase Hosting"
6. Click **"Register app"**
7. Copy the `firebaseConfig` object

It will look like:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "mermaid-lagoon-abc123.firebaseapp.com",
  projectId: "mermaid-lagoon-abc123",
  storageBucket: "mermaid-lagoon-abc123.appspot.com",
  messagingSenderId: "1234567890",
  appId: "1:1234567890:web:abcdef123456"
};

x
```

---

## Step 8: Set Up Environment Variables

1. In your project root, create `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Open `.env.local` and fill in your Firebase config values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=mermaid-lagoon-abc123.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=mermaid-lagoon-abc123
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=mermaid-lagoon-abc123.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1234567890
NEXT_PUBLIC_FIREBASE_APP_ID=1:1234567890:web:abcdef123456

# Set your admin credentials (from Step 6)
ADMIN_EMAIL=admin@mermaidalay.com
ADMIN_PASSWORD=your_password_here

# Resend API key (we'll set this up later for emails)
RESEND_API_KEY=re_...
```

---

## Step 9: Test the Setup

1. Restart your dev server:
   ```bash
   npm run dev
   ```

2. Open http://localhost:3013
3. Try to book - it should save to Firebase!
4. Go to http://localhost:3013/admin/login
5. Log in with your admin credentials
6. View all bookings in the dashboard

---

## Step 10: Set Up Email Notifications (Optional)

### Using Resend (FREE for 3,000 emails/month)

1. Go to https://resend.com/signup
2. Create account (use GitHub or Google)
3. Add your domain OR use `onboarding@resend.dev` for testing
4. Go to **API Keys** → Create API Key
5. Copy the key (starts with `re_...`)
6. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   ```

Now booking confirmations will be sent automatically!

---

## 📊 What You Get

### **For Customers:**
- ✅ Beautiful booking form with calendar
- ✅ Real-time availability checking
- ✅ Instant confirmation email
- ✅ Booking reference number

### **For You (Admin):**
- ✅ Secure admin login
- ✅ Dashboard showing all bookings
- ✅ See customer details, dates, packages
- ✅ Mark bookings as paid/completed
- ✅ Real-time updates (no page refresh needed!)

---

## 💰 Firebase Pricing

**FREE Tier includes:**
- 50,000 reads/day
- 20,000 writes/day  
- 1GB storage
- 10GB/month bandwidth

**You'll likely stay FREE** unless you get 100+ bookings/day!

If you exceed: ~$0.06 per 100K reads, $0.18 per 100K writes

**Typical cost:** $0-5/month for a growing business

---

## 🔐 Security Notes

1. **Never commit `.env.local`** to git (already in .gitignore)
2. **Change admin password** from the example
3. **Use strong passwords** for admin accounts
4. Firestore rules are already secure (admins only can view bookings)

---

## 🚀 Deploy to Production (Vercel)

1. In Vercel dashboard, go to your project
2. Settings → Environment Variables
3. Add all variables from `.env.local`
4. Redeploy:
   ```bash
   vercel --prod
   ```

Your Firebase backend works on production too!

---

## Need Help?

If you get stuck on any step, just ask! Common issues:
- Firebase config not working → Check all env vars are set
- Can't log in → Verify admin user was created in Firebase Auth
- Bookings not saving → Check Firestore rules are published
- 403 npm error → Try `npm cache clean --force` then retry

---

**You're all set!** 🎉

Firebase setup complete. You now have:
- Real database for bookings
- Admin authentication  
- Admin dashboard
- Email confirmations
- Full control over your data
- ~$0/month cost
