# SIMPLARA Landing Page

A modern, mobile-first landing page for SIMPLARA - an AI wardrobe assistant with LUMI.

## Features

- ✨ Built with Next.js 14, TypeScript, and TailwindCSS
- 📱 Mobile-first responsive design
- 🎨 Beautiful gradient UI with smooth animations
- 📝 Comprehensive waitlist form ready for backend integration
- 🐱 Meet LUMI - the AI wardrobe assistant
- ♿ Accessible and semantic HTML
- 🚀 Production-ready code

## Project Structure

```
.
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main landing page
│   └── globals.css         # Global styles
├── components/
│   ├── Hero.tsx            # Hero section with CTAs
│   ├── Problem.tsx         # Problem statement section
│   ├── Solution.tsx        # Solution explanation
│   ├── HowItWorks.tsx      # 5-step process
│   ├── Features.tsx        # Core features showcase
│   ├── MeetLumi.tsx        # LUMI introduction
│   ├── WaitlistForm.tsx    # Lead collection form
│   ├── FAQ.tsx             # Frequently asked questions
│   └── Footer.tsx          # Footer with links
├── public/
│   └── assets/             # Place your images here
│       ├── logo.png        # SIMPLARA logo
│       └── lumi.png        # LUMI mascot
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm installed

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Assets

Place your brand assets in the `public/assets/` folder:

- **SIMPLARA logo**: `public/assets/logo.png`
- **LUMI mascot**: `public/assets/lumi.png`

Currently, the landing page uses emoji placeholders (👔 for logo, 🐱 for LUMI). Replace these by importing your actual images in the components.

## Form Integration

The waitlist form in `components/WaitlistForm.tsx` is ready for backend integration. To connect it:

### Option 1: Google Sheets (via Google Apps Script)

1. Create a Google Sheet
2. Set up an Apps Script web app to receive POST requests
3. Update the `handleSubmit` function in `WaitlistForm.tsx`

### Option 2: Tally.so

1. Create a Tally form with matching fields
2. Replace the form with Tally's embed code

### Option 3: Custom API

Update the `handleSubmit` function:

```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  const response = await fetch('/api/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData),
  });
  
  if (response.ok) {
    setIsSubmitted(true);
  }
};
```

## Form Fields Collected

- Name (required)
- Email or Telegram (required)
- City (required)
- Gender (required)
- Age Range (required)
- MVP Testing Interest (required)
- Wardrobe Size (required)
- Main Wardrobe Problem (required)
- Instagram/TikTok (optional)

## Building for Production

```bash
npm run build
npm start
```

## Analytics Setup

To add analytics tracking, update `app/layout.tsx` to include:

- Google Analytics
- Meta Pixel
- TikTok Pixel
- UTM tracking

## Customization

### Colors

Edit colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#6366f1",      // Main CTA color
  secondary: "#f5f3ff",    // Soft background
  accent: "#fef08a",       // Accent highlights
}
```

### Content

All text content is editable directly in the component files. Key sections:

- **Hero headline**: `components/Hero.tsx`
- **Problem points**: `components/Problem.tsx`
- **Features list**: `components/Features.tsx`
- **FAQ items**: `components/FAQ.tsx`

## Performance

- Uses Next.js Image optimization
- Lazy loading for images
- Optimized for Core Web Vitals
- Mobile-first approach

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

Proprietary - SIMPLARA

## Contact

For questions about this landing page implementation, contact the development team.

---

Built with ❤️ for SIMPLARA
