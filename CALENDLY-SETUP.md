# ⚠️ DEPRECATED - Using Firebase Instead

## This project now uses Firebase for bookings, not Calendly!

**Follow [FIREBASE-SETUP.md](FIREBASE-SETUP.md) instead** for complete setup instructions.

---

## Why Firebase Instead of Calendly?

You decided to use Firebase because you need:
- ✅ **Admin authentication** (secure login)
- ✅ **Admin dashboard** (view/manage all bookings)
- ✅ **Full control** over booking data
- ✅ **Custom UI** (keep your beautiful calendar component)
- ✅ **Lower cost** ($0-5/month vs $20/month for Acuity)
- ✅ **Scalability** as your business grows

---

## Quick Start with Firebase

1. **Install Firebase SDK** (once npm is working):
   ```bash
   npm install firebase
   ```

2. **Follow the complete guide**:
   - Open [FIREBASE-SETUP.md](FIREBASE-SETUP.md)
   - Create Firebase project
   - Enable Firestore & Authentication
   - Set up environment variables
   - Create admin user
   - Test the system

---

## What's Already Built

✅ Firebase configuration  
✅ Booking submission to Firestore  
✅ Admin authentication (Firebase Auth)  
✅ Admin dashboard with real-time updates  
✅ Email confirmations (via Resend API)  
✅ Booking status management  
✅ Custom AvailabilityCalendar component  

**Everything is ready!** Just need to:
1. Install `firebase` npm package
2. Create your Firebase project
3. Add environment variables
4. Create admin user

That's it! 🎉

---

## Cost Comparison

| Solution | Setup Time | Monthly Cost | Control | Features |
|----------|-----------|--------------|---------|----------|
| **Firebase** | 30 min | $0-5 | Full | Custom dashboard, auth, email |
| Calendly FREE | 5 min | $0 | Limited | Basic scheduling only |
| Acuity Paid | 5 min | $20 | Medium | Scheduling + payments |

**Firebase is the best choice for your needs!** 🔥

1. Go to https://calendly.com/signup
2. Sign up with your email (or Google account)
3. Choose the **FREE Basic plan** to start

---

## Step 2: Create Your Event Type

Once logged in:

1. Click **"+ Create"** → **"Event Type"**
2. Choose **"One-on-One"** (even though it's for parties - you can customize later)
3. Fill in the details:

### Event Name:
```
Mermaid Lagoon Party Consultation
```

### Location:
```
Phone call or Video call (you'll follow up with address details)
```
Or use "Custom" and add: `We'll contact you to confirm service location`

### Duration:
```
15 minutes (just for initial booking/consultation)
```

### Description:
```
Book your magical mermaid lagoon experience! 

During this quick consultation call, we'll:
- Discuss your preferred package (Splash, Deluxe, or Luxury)
- Confirm your event date, time, and location
- Answer any questions about setup, mermaid tails, add-ons, and more

Available service areas: San Jose, Sunnyvale, Mountain View, and surrounding areas.

Questions? Email hello@mermaidalay.com or call (555) 123-4567
```

### Custom Questions to Add:
Click **"Add Question"** and create these:

1. **Event Date Preference** (Text field)
   - "What is your preferred party date?"
   
2. **Number of Guests** (Text field)
   - "How many children will be attending?"
   
3. **Preferred Package** (Multiple choice)
   - Mermaid Splash ($750 - 4 hours)
   - Deluxe Mermaid Party ($900 - 6 hours)
   - Luxury Mermaid Experience ($1250 - 8 hours)
   
4. **Service Area** (Multiple choice)
   - San Jose
   - Sunnyvale
   - Mountain View
   - Other (please specify)

5. **Add-ons Interest** (Checkboxes)
   - Bubble machine (+$75)
   - Extra mermaid tails (+$10 each)
   - Jewels (+$50)
   - Seashell throne (+$50)

6. **Phone Number** (Text field, required)
   - "Best phone number to reach you"

---

## Step 3: Get Your Calendly URL

1. After creating your event, click on it
2. You'll see your scheduling link - it looks like:
   ```
   https://calendly.com/your-username/mermaid-lagoon-consultation
   ```
3. **Copy this URL**

---

## Step 4: Add Your URL to the Website

1. Open the file: `components/Navbar.js`
2. Find **line 11** (around line 11):
   ```javascript
   const calendlyUrl = 'https://calendly.com/your-username/mermaid-lagoon'; // ⬅️ UPDATE THIS
   ```
3. Replace with **your actual Calendly URL**:
   ```javascript
   const calendlyUrl = 'https://calendly.com/yourname/mermaid-lagoon-consultation';
   ```
4. Save the file

---

## Step 5: Test It!

1. Run your dev server: `npm run dev`
2. Click **"Book Now"** button
3. Calendly popup should appear with your booking form!

---

## 🎉 You're All Set!

Now when visitors click "Book Now", they'll see your Calendly booking form in a popup.

### What Happens Next?
1. Customer books a consultation call
2. You get email notification
3. You call them to finalize details
4. You manually send invoice via Venmo/Zelle/PayPal
5. Done!

---

## 💰 Upgrade to Paid Later (When You Get Bookings)

When you're ready to collect payments automatically:

### Switch to Acuity Scheduling ($20/month):
- Multiple event types (one per package)
- Built-in payments (Stripe/Square/PayPal)
- Add-ons and package deals
- Automatic invoicing
- Better for service businesses

**Keep Calendly free version until you get 2-3 bookings**, then upgrade to a paid solution.

---

## Need Help?

If you have issues, just ask! The integration is already done - you just need to add your URL.
