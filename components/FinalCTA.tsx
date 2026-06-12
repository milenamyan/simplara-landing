"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function FinalCTA() {
  const t = useTranslations("finalCTA");

  const scrollToFoundersClub = () => {
    document.getElementById("founders-club")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-gradient-to-br from-primary via-primary/95 to-primary-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* LUMI character */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white rounded-full shadow-2xl mx-auto flex items-center justify-center border-2 sm:border-4 border-white/30 overflow-hidden">
            <Image 
              src="/assets/lumi.png" 
              alt="LUMI" 
              width={112} 
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-3 sm:mb-4 md:mb-6 px-2 leading-tight">
          {t("title")}
        </h2>
        
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6 sm:mb-8 px-2">
          <button
            onClick={scrollToWaitlist}
            className="bg-white hover:bg-gray-50 text-primary font-bold px-6 py-3.5 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 text-sm sm:text-base lg:text-lg min-h-[44px]"
          >
            {t("joinWaitlist")}
          </button>
          <button
            onClick={scrollToFoundersClub}
            className="bg-transparent hover:bg-white/10 text-white border-2 sm:border-3 border-white font-bold px-6 py-3.5 sm:px-8 sm:py-4 md:px-10 md:py-5 rounded-full transition-all duration-200 text-sm sm:text-base lg:text-lg min-h-[44px]"
          >
            {t("becomeMVPTester")}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-white/80 text-xs sm:text-sm md:text-base px-4">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="leading-tight">{t("feature1")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="leading-tight">{t("feature2")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span className="leading-tight">{t("feature3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
