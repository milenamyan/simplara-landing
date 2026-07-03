# Waitlist Google Sheets Integration - Quick Start

## Overview

Your waitlist form now saves submissions directly to Google Sheets using Google Apps Script.

## Setup Steps (Do These First!)

### 1. Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it: `SIMPLARA Waitlist`
3. Add these headers in row 1:
   - A: `Timestamp`
   - B: `Name`
   - C: `Email`
   - D: `Telegram`
   - E: `City`
   - F: `Gender`
   - G: `Age Range`
   - H: `MVP Tester`
   - I: `Wardrobe Size`
   - J: `Main Problem`
   - K: `Social Media`
   - L: `TG Channel Access`

### 2. Deploy Google Apps Script
1. In your sheet: **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy the code from `GOOGLE_SHEETS_SETUP.md` (Step 2)
4. Save the project as "SIMPLARA Waitlist Handler"
5. Click **Deploy** → **New deployment**
6. Select type: **Web app**
7. Configure:
   - Execute as: **Me**
   - Who has access: **Anyone**
8. Click **Deploy** and authorize
9. **Copy the deployment URL** (looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### 3. Configure Your Project
1. Create `.env.local` file in your project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Google Apps Script URL:
   ```env
   NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_SCRIPT_ID/exec
   ```

3. Restart your dev server:
   ```bash
   npm run dev
   ```

### 4. Test It!
1. Open your landing page: http://localhost:3000
2. Scroll to the waitlist form
3. Fill it out and submit
4. Check your Google Sheet - you should see the data!

## What Gets Saved

The following fields are sent to Google Sheets:
- ✅ Timestamp (auto-generated)
- ✅ Name
- ✅ Email
- ✅ Telegram
- ✅ City
- ✅ Gender
- ✅ Age Range
- ✅ MVP Tester
- ✅ Wardrobe Size
- ✅ Main Problem
- ✅ Social Media
- ✅ TG Channel Access

## Files Modified

1. **`components/WaitlistForm.tsx`**
   - Now submits to Google Apps Script
   - Shows loading state while submitting
   - Displays error messages if submission fails

2. **`GOOGLE_SHEETS_SETUP.md`**
   - Complete setup guide with code
   - Troubleshooting tips
   - Optional enhancements

3. **`.env.local.example`**
   - Template for environment variables

4. **`app/api/waitlist/route.ts`**
   - Documented for future use
   - Currently not being called

## Troubleshooting

### Form shows "Google Script URL not configured" error
- Make sure `.env.local` exists with `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`
- Restart your dev server after creating `.env.local`

### Data not appearing in Google Sheet
- Check Google Apps Script logs: **View** → **Execution log**
- Verify deployment is set to "Anyone" access
- Try re-deploying the script

### CORS errors in browser console
- This is normal with `no-cors` mode
- If form shows success message, data was likely saved
- Check your Google Sheet to verify

## Next Steps

- [ ] Test the form submission
- [ ] Verify data appears in Google Sheet
- [ ] Set up email notifications (optional)
- [ ] Create a dashboard to view submissions
- [ ] Add data export functionality

## Support

For detailed setup instructions, see: **GOOGLE_SHEETS_SETUP.md**
