"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Footer() {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white pt-8 sm:pt-10 lg:pt-12 pb-20 sm:pb-24 lg:pb-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 sm:mb-10">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-2 sm:gap-2.5 mb-2 sm:mb-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0">
                <Image 
                  src="/assets/logo.png" 
                  alt="SIMPLARA Logo" 
                  width={56} 
                  height={56}
                  className="w-full h-full object-contain rounded-xl sm:rounded-2xl"
                />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold">SIMPLARA</h3>
                <p className="text-xs sm:text-sm text-gray-400">{t("tagline")}</p>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-400 mb-3 sm:mb-4 max-w-md">
              {t("description")}
            </p>
            <div className="flex gap-2 sm:gap-3">
              <a
                href="https://www.instagram.com/itslumicat?igsh=MTRid243ZWJ2ZWIwdQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073z"/>
                  <path d="M12 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@itslumi.cat?_r=1&_t=ZS-97cM6Dg4HtQ"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 hover:bg-primary rounded-full flex items-center justify-center transition-colors min-h-[44px] min-w-[44px]"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1-.1z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 sm:pt-6 border-t border-gray-800">
          <div className="flex justify-center md:justify-start">
            <p className="text-gray-400 text-xs sm:text-sm text-center md:text-left">
              {t("copyright", { year: currentYear })}
            </p>
          </div>
          
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-gray-500 text-xs sm:text-sm flex items-center justify-center gap-2">
              {t("madeWith")}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
