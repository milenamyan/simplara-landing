# SIMPLARA Landing Page - Deployment Guide

## Quick Deploy Options

### Option 1: Vercel (Recommended for Next.js)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-detect Next.js and configure everything
4. Deploy with one click

**Environment Variables** (if needed later):
- `NEXT_PUBLIC_GA_ID` - Google Analytics ID
- `NEXT_PUBLIC_API_URL` - API endpoint for form submissions

### Option 2: Netlify

1. Build command: `npm run build`
2. Publish directory: `.next`
3. Install the Next.js plugin

### Option 3: Custom Server

Build the production bundle:

```bash
npm run build
npm start
```

Requires Node.js 18+ on your server.

### Option 4: Static Export (Optional)

If you want a fully static site, update `next.config.mjs`:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};
```

Then build:

```bash
npm run build
```

Output will be in the `out/` directory.

## Pre-Deployment Checklist

- [ ] Replace emoji placeholders with actual SIMPLARA logo and LUMI mascot
- [ ] Test waitlist form submission
- [ ] Update contact email in FAQ section
- [ ] Add analytics tracking codes
- [ ] Test on mobile devices
- [ ] Check all links in Footer
- [ ] Add Open Graph meta tags for social sharing
- [ ] Set up error tracking (e.g., Sentry)
- [ ] Configure CORS if using external API
- [ ] Add Google Search Console verification
- [ ] Test form validation

## Domain Setup

After deploying, configure your custom domain:

1. Add DNS records pointing to your hosting provider
2. Enable HTTPS (automatic on Vercel/Netlify)
3. Update meta tags with final domain

## Analytics Integration

Add to `app/layout.tsx`:

```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
<Script id="google-analytics">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'GA_ID');
  `}
</Script>
```

## Form Backend Options

### Quick Setup with Formspree

```tsx
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  {/* Your form fields */}
</form>
```

### Google Sheets Integration

1. Create Google Sheet
2. Deploy this Apps Script:

```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.name,
    data.contact,
    data.city,
    data.gender,
    data.ageRange,
    data.mvpTester,
    data.wardrobeSize,
    data.mainProblem,
    data.socialMedia
  ]);
  return ContentService.createTextOutput(JSON.stringify({success: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Deploy as web app
4. Update form endpoint

## Performance Optimization

Already included:
- Next.js automatic code splitting
- Image optimization with next/image
- Font optimization with next/font
- CSS optimization with TailwindCSS

Optional improvements:
- Add Redis for rate limiting form submissions
- Implement Cloudflare for CDN
- Use next/image for all images
- Add prefetching for critical routes

## Monitoring

Recommended tools:
- **Uptime**: UptimeRobot or Pingdom
- **Analytics**: Google Analytics, Plausible, or Fathom
- **Errors**: Sentry or LogRocket
- **Performance**: Lighthouse CI, WebPageTest

## Post-Launch

1. Submit sitemap to Google Search Console
2. Set up email notifications for form submissions
3. Monitor analytics for drop-off points
4. A/B test different hero headlines
5. Collect user feedback
6. Track conversion rate (visits → waitlist signups)

## Troubleshooting

**Issue**: Form not submitting
- Check browser console for errors
- Verify API endpoint is accessible
- Check CORS configuration

**Issue**: Images not loading
- Verify file paths in public/ folder
- Check Next.js image configuration
- Ensure proper import statements

**Issue**: Slow page load
- Run Lighthouse audit
- Check image sizes
- Verify CDN is active
- Enable Gzip compression

## Support

For technical issues, check:
- Next.js Documentation: https://nextjs.org/docs
- TailwindCSS Documentation: https://tailwindcss.com/docs
- Vercel Support: https://vercel.com/support

---

Ready to launch SIMPLARA! 🚀
