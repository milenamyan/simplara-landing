"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");
  
  const scrollToWaitlist = () => {
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-b from-secondary via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 text-sm font-medium text-gray-700 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {t("badge")}
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-dark mb-6 leading-tight">
              {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
              {t("description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={scrollToWaitlist}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                {t("joinWaitlist")}
              </button>
              <button
                onClick={scrollToWaitlist}
                className="bg-white hover:bg-gray-50 text-primary border-2 border-primary font-semibold px-8 py-4 rounded-full transition-all duration-200"
              >
                {t("becomeTester")}
              </button>
            </div>

            <div className="mt-8 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
                <span>{t("forMenWomen")}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <span>{t("freeToJoin")}</span>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl p-8 shadow-2xl">
              {/* Placeholder for app mockup */}
              <div className="aspect-[9/16] max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border-8 border-gray-800">
                <div className="h-full bg-gradient-to-b from-gray-50 to-white p-6 flex flex-col">
                  <div className="text-center mb-6">
                    <div className="inline-block bg-primary/10 rounded-full px-4 py-2 mb-3">
                      <p className="text-sm font-medium text-primary">{t("lumiQuestion")}</p>
                    </div>
                  </div>
                  
                  {/* Outfit cards placeholder */}
                  <div className="flex-1 flex flex-col gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-indigo-200">
                      <div className="text-xs font-semibold text-primary mb-2">{t("todaysOutfit")}</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-white rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-lg shadow-sm"></div>
                      </div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-200">
                      <div className="text-xs font-semibold text-purple-600 mb-2">{t("tomorrow")}</div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="aspect-square bg-white rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-lg shadow-sm"></div>
                        <div className="aspect-square bg-white rounded-lg shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* LUMI mascot */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-white rounded-full shadow-xl border-4 border-primary/20 flex items-center justify-center overflow-hidden">
                <Image 
                  src="/assets/lumi.png" 
                  alt="LUMI - AI Wardrobe Assistant" 
                  width={96} 
                  height={96}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
