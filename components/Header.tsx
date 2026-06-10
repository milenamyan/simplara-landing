"use client";

import { useTranslations, useLocale } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Image from "next/image";
import { useState } from "react";

type Locale = (typeof routing.locales)[number];

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  const switchLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
    setIsLangMenuOpen(false);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const goToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const languages: { code: Locale; name: string }[] = [
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12 sm:h-14">
          {/* Logo */}
          <Link
            href="/"
            onClick={goToHome}
            className="flex items-center gap-1.5 sm:gap-2 min-h-[44px]"
          >
            <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0">
              <Image
                src="/assets/logo.png"
                alt="SIMPLARA"
                width={40}
                height={40}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-dark">SIMPLARA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t("features")}
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t("howItWorks")}
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-gray-700 hover:text-primary font-medium transition-colors"
            >
              {t("faq")}
            </button>

            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">
                  {locale.toUpperCase()}
                </span>
                <svg
                  className={`w-4 h-4 text-gray-700 transition-transform ${
                    isLangMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                        locale === lang.code ? "bg-primary/5" : ""
                      }`}
                    >
                      <span
                        className={`text-sm font-medium ${
                          locale === lang.code
                            ? "text-primary"
                            : "text-gray-700"
                        }`}
                      >
                        {lang.code.toUpperCase()}
                      </span>
                      <span
                        className={`text-sm ${
                          locale === lang.code
                            ? "text-primary"
                            : "text-gray-500"
                        }`}
                      >
                        {lang.name}
                      </span>
                      {locale === lang.code && (
                        <svg
                          className="w-4 h-4 text-primary ml-auto"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => scrollToSection("waitlist")}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-sm lg:text-base min-h-[44px]"
            >
              {t("joinWaitlist")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            {/* Mobile Language Switcher */}
            <button
              onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
              className="text-xs sm:text-sm font-medium text-gray-700 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Change language"
            >
              {locale.toUpperCase()}
            </button>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-100">
            <div className="flex flex-col gap-2">
              <button
                onClick={() => scrollToSection("features")}
                className="text-left text-gray-700 hover:text-primary font-medium transition-colors py-2 min-h-[44px]"
              >
                {t("features")}
              </button>
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left text-gray-700 hover:text-primary font-medium transition-colors py-2 min-h-[44px]"
              >
                {t("howItWorks")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-gray-700 hover:text-primary font-medium transition-colors py-2 min-h-[44px]"
              >
                {t("faq")}
              </button>
              <button
                onClick={() => scrollToSection("waitlist")}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-md text-center mt-2 min-h-[44px]"
              >
                {t("joinWaitlist")}
              </button>
            </div>
          </div>
        )}

        {/* Mobile Language Menu */}
        {isLangMenuOpen && (
          <div className="md:hidden absolute right-4 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 transition-colors ${
                  locale === lang.code ? "bg-primary/5" : ""
                }`}
              >
                <span
                  className={`text-sm font-medium ${
                    locale === lang.code ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {lang.code.toUpperCase()}
                </span>
                <span
                  className={`text-sm ${
                    locale === lang.code ? "text-primary" : "text-gray-500"
                  }`}
                >
                  {lang.name}
                </span>
                {locale === lang.code && (
                  <svg
                    className="w-4 h-4 text-primary ml-auto"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
