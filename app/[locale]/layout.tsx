import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { routing } from '@/i18n/routing';
import ReferralTracker from '@/components/ReferralTracker';
import ScrollToTop from '@/components/ScrollToTop';
import "../globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateMetadata() {
  return {
    title: "SIMPLARA - AI Wardrobe Assistant with LUMI",
    description: "No more 'I have nothing to wear'. SIMPLARA is an AI wardrobe with LUMI, an assistant that builds outfits from your real clothes.",
    keywords: "AI wardrobe, digital closet, outfit planner, fashion assistant, LUMI, style app",
    icons: {
      icon: "/assets/logo.png",
      apple: "/assets/logo.png",
    },
    openGraph: {
      title: "SIMPLARA - AI Wardrobe Assistant",
      description: "Build stylish outfits from clothes you already own with AI assistant LUMI",
      type: "website",
      images: [
        {
          url: "/assets/logo.png",
          width: 512,
          height: 512,
          alt: "SIMPLARA Logo",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "SIMPLARA - AI Wardrobe Assistant",
      description: "Build stylish outfits from clothes you already own with AI assistant LUMI",
      images: ["/assets/logo.png"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <ScrollToTop />
        <ReferralTracker />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
