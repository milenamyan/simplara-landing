import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { Inter } from "next/font/google";
import { routing } from '@/i18n/routing';
import ScrollToTop from '@/components/ScrollToTop';
import "../globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function generateMetadata({ params: { locale } }: { params: { locale: string } }) {
  return {
    title: locale === 'ru' ? "SIMPLARA - AI Ассистент Гардероба с LUMI" : "SIMPLARA - AI Wardrobe Assistant with LUMI",
    description: locale === 'ru' 
      ? "Больше никакого 'Мне нечего надеть'. SIMPLARA - это AI гардероб с LUMI, ассистентом, который создает образы из вашей настоящей одежды."
      : "No more 'I have nothing to wear'. SIMPLARA is an AI wardrobe with LUMI, an assistant that builds outfits from your real clothes.",
    keywords: locale === 'ru' 
      ? "AI гардероб, цифровой гардероб, планировщик нарядов, модный ассистент, LUMI, приложение стиля"
      : "AI wardrobe, digital closet, outfit planner, fashion assistant, LUMI, style app",
    icons: {
      icon: "/assets/logo.png",
      apple: "/assets/logo.png",
    },
    openGraph: {
      title: locale === 'ru' ? "SIMPLARA - AI Ассистент Гардероба" : "SIMPLARA - AI Wardrobe Assistant",
      description: locale === 'ru'
        ? "Создавайте стильные образы из одежды, которая у вас уже есть, с AI ассистентом LUMI"
        : "Build stylish outfits from clothes you already own with AI assistant LUMI",
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
      title: locale === 'ru' ? "SIMPLARA - AI Ассистент Гардероба" : "SIMPLARA - AI Wardrobe Assistant",
      description: locale === 'ru'
        ? "Создавайте стильные образы из одежды, которая у вас уже есть, с AI ассистентом LUMI"
        : "Build stylish outfits from clothes you already own with AI assistant LUMI",
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
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
