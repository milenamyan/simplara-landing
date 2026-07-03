"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const goToWaitlist = (membershipType: "founders" | "waitlist") => {
    window.dispatchEvent(
      new CustomEvent("simplara:select-membership", { detail: membershipType })
    );
    scrollToSection("waitlist");
  };

  const goToHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    setIsMenuOpen(false);
    if (pathname === "/") {
      e.preventDefault();
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
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
            <span className="text-base sm:text-lg md:text-xl font-bold text-dark">SIMPLARA</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
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

            <button
              onClick={() => scrollToSection("founders-club")}
              className="hidden md:inline-flex items-center text-primary hover:text-primary-dark border-2 border-primary font-semibold px-4 py-2 rounded-full transition-all duration-200 text-sm min-h-[44px]"
            >
              {t("joinFoundersClub")}
            </button>
            <button
              onClick={() => goToWaitlist("waitlist")}
              className="bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2 rounded-full transition-all duration-200 shadow-md hover:shadow-lg text-sm lg:text-base min-h-[44px]"
            >
              {t("joinWaitlist")}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
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
          <div className="md:hidden mx-2 mt-2 mb-3 rounded-2xl border border-gray-200 shadow-xl bg-white/95 backdrop-blur-sm p-3">
            <div className="flex flex-col gap-1">
              <button
                onClick={() => scrollToSection("how-it-works")}
                className="text-left text-gray-700 hover:text-primary hover:bg-gray-50 font-medium transition-colors py-2.5 px-3 rounded-xl min-h-[44px]"
              >
                {t("howItWorks")}
              </button>
              <button
                onClick={() => scrollToSection("faq")}
                className="text-left text-gray-700 hover:text-primary hover:bg-gray-50 font-medium transition-colors py-2.5 px-3 rounded-xl min-h-[44px]"
              >
                {t("faq")}
              </button>
              <button
                onClick={() => scrollToSection("founders-club")}
                className="text-primary border-2 border-primary hover:bg-primary/5 font-semibold px-6 py-3 rounded-full transition-all duration-200 text-center mt-2 min-h-[44px]"
              >
                {t("joinFoundersClub")}
              </button>
              <button
                onClick={() => goToWaitlist("waitlist")}
                className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 rounded-full transition-all duration-200 shadow-md text-center min-h-[44px]"
              >
                {t("joinWaitlist")}
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
