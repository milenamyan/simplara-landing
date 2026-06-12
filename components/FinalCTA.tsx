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
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-primary/95 to-primary-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-white/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* LUMI character */}
        <div className="mb-6 sm:mb-8">
          <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-full shadow-2xl mx-auto flex items-center justify-center border-4 border-white/30 overflow-hidden">
            <Image 
              src="/assets/lumi.png" 
              alt="LUMI" 
              width={112} 
              height={112}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 px-2 leading-tight">
          {t("title")}
        </h2>
        
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-8 sm:mb-10 max-w-3xl mx-auto px-4 leading-relaxed">
          {t("subtitle")}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <button
            onClick={scrollToWaitlist}
            className="bg-white hover:bg-gray-50 text-primary font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl active:scale-95 text-base sm:text-lg min-h-[44px]"
          >
            {t("joinWaitlist")}
          </button>
          <button
            onClick={scrollToFoundersClub}
            className="bg-transparent hover:bg-white/10 text-white border-3 border-white font-bold px-8 py-4 sm:px-10 sm:py-5 rounded-full transition-all duration-200 text-base sm:text-lg min-h-[44px]"
          >
            {t("becomeMVPTester")}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 text-white/80 text-sm sm:text-base">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>{t("feature1")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>{t("feature2")}</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <span>{t("feature3")}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
