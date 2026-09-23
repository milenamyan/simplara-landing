# Google Sheets Waitlist Integration Setup

This guide will help you set up Google Sheets to receive waitlist form submissions.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "SIMPLARA Waitlist"
4. In the first row (headers), add these columns in order:
   - Column A: `Timestamp`
   - Column B: `Membership Type`
   - Column C: `Name`
   - Column D: `Email`
   - Column E: `Telegram`
   - Column F: `City`
   - Column G: `Gender`
   - Column H: `Age Range`
   - Column I: `MVP Tester`
   - Column J: `Wardrobe Size`
   - Column K: `Main Problem`
   - Column L: `Social Media`
   - Column M: `TG Channel Access`
   - … (existing geo columns as already in your sheet)
   - Last column: `Ref` (influencer referral id, e.g. `dinul_hakobyann`)

The script will also auto-create a second tab named **`ReferralClicks`** for link opens (even without signup).

## Referral links

Give each influencer a unique URL:

- `https://simplara.org/?ref=dinul_hakobyann`
- `https://simplara.org/?ref=_ella__99`

Any `?ref=` value is stored (letters, numbers, `_`, `-`). Visits are logged once per browser session to `ReferralClicks`; signups include the same `ref` on the waitlist sheet. Vercel Analytics also receives a `referral_visit` custom event with `{ ref }`.

After updating `Code.gs`, redeploy the Apps Script (**Manage deployments** → **New version**). Confirm `doGet` returns `"version": 4`.

## Step 2: Create Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code in the editor
3. Copy and paste **all** of the code from `google-apps-script/Code.gs` in this project

4. Click **Save** (💾 icon) and name your project "SIMPLARA Waitlist Handler"

> The script must be created from **Extensions → Apps Script** inside your spreadsheet (container-bound). A standalone script project may write to the wrong sheet.

## Step 3: Deploy the Script

> **Important:** Saving the script is not enough. Every time you change the code, you must publish a **new deployment version** (see step 8 below).

1. Click **Deploy** → **New deployment** (first time only)
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure the deployment:
   - **Description**: "Waitlist Form Handler"
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. **Important**: You'll need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
7. **Copy the Web App URL** - it will look like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
8. Save this URL - you'll need it in the next step

### Updating the script after changes

If you already deployed and only edited the code:

1. Click **Deploy** → **Manage deployments**
2. Click the pencil/edit icon on the active deployment
3. Set **Version** to **New version**
4. Click **Deploy**

The Web App URL stays the same — you do **not** need a new URL.

### Verify in Apps Script before testing the website

1. Run the `testPost` function in Apps Script
2. Check **View** → **Execution log** — you should see `{"success":true,...}`
3. Confirm a test row appears with **all 13 fields** filled (including Membership Type, Email, Telegram, Wardrobe Size, Main Problem, Social Media, and TG Channel Access)
4. Open your Web App URL in a browser — you should see `{"success":true,"version":4,...}`. If you do not see `version: 4`, the new deployment is not live yet.
5. Optionally run `testReferralClick` — a row should appear on the **ReferralClicks** tab.

## Step 4: Update Environment Variables

1. Create a `.env.local` file in your project root (if it doesn't exist)
2. Add your Google Apps Script URL:

```env
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

Replace `YOUR_SCRIPT_ID` with your actual script URL from Step 3.

## Step 5: Test the Integration

1. Start your development server: `npm run dev`
2. Go to your landing page
3. Scroll to the waitlist form
4. Fill out and submit the form
5. Check your Google Sheet - you should see a new row with the submission!

## Troubleshooting

### Issue: CORS errors
- Make sure you deployed as "Web app" with "Anyone" access
- Redeploy if you made changes to the script

### Issue: Data not appearing
- Check the Google Apps Script logs: **View** → **Execution log**
- Verify the column headers match exactly
- Test the `testPost()` function in Apps Script

### Issue: Name/City save but Email/Telegram are empty
- Your deployment is still running an **old script version** that expected a single `contact` field
- Copy the latest code from `google-apps-script/Code.gs`
- **Deploy** → **Manage deployments** → **Edit** → **New version** → **Deploy**
- Restart `npm run dev` after changing `.env.local`

### Issue: Authorization errors
- Go back to Apps Script
- **Deploy** → **Manage deployments**
- Edit the deployment and re-authorize

## Data Privacy

- Only you (the sheet owner) can access the submitted data
- The script runs under your Google account
- Users cannot see or access the spreadsheet
- Consider adding a privacy policy link to your form

## Next Steps

- Set up email notifications for new submissions
- Create a dashboard to analyze waitlist data
- Export data to CRM or marketing tools
