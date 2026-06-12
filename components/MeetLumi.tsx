"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function MeetLumi() {
  const t = useTranslations("meetLumi");

  const qualities = [
    {
      icon: "💬",
      title: t("qualities.0.title"),
      description: t("qualities.0.description"),
    },
    {
      icon: "🚫",
      title: t("qualities.1.title"),
      description: t("qualities.1.description"),
    },
    {
      icon: "🧠",
      title: t("qualities.2.title"),
      description: t("qualities.2.description"),
    },
    {
      icon: "🎮",
      title: t("qualities.3.title"),
      description: t("qualities.3.description"),
    },
  ];

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left: LUMI Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 rounded-2xl sm:rounded-3xl p-8 sm:p-10 md:p-12 lg:p-16 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-purple-300/20 rounded-full blur-3xl"></div>
              
              {/* LUMI mascot - large */}
              <div className="relative z-10 flex justify-center">
                <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 sm:border-6 border-primary/20 overflow-hidden">
                  <Image 
                    src="/assets/lumi.png" 
                    alt="LUMI - Your AI Fashion Companion" 
                    width={320} 
                    height={320}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating speech bubble */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 lg:top-12 lg:right-12 bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-xl p-2 sm:p-3 md:p-4 max-w-[140px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-xs animate-bounce z-50">
                <p className="text-[10px] sm:text-xs md:text-sm lg:text-base font-medium text-dark leading-tight">
                  {t("speechBubble")}
                </p>
                <div className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 right-4 sm:right-6 md:right-8 w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 bg-white transform rotate-45"></div>
              </div>

              {/* Floating icons — symmetric arc on the left of Lumi */}
              <div className="absolute top-10 left-[13%] sm:top-12 sm:left-[14%] md:top-14 md:left-[15%] lg:top-16 lg:left-[16%] bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg z-20">
                <span className="text-lg sm:text-xl md:text-2xl">🎨</span>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-[8%] sm:left-[9%] md:left-[10%] lg:left-[11%] bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg z-20">
                <span className="text-lg sm:text-xl md:text-2xl">👕</span>
              </div>
              <div className="absolute bottom-10 left-[13%] sm:bottom-12 sm:left-[14%] md:bottom-14 md:left-[15%] lg:bottom-16 lg:left-[16%] bg-white rounded-full p-2 sm:p-2.5 md:p-3 shadow-lg z-20">
                <span className="text-lg sm:text-xl md:text-2xl">✨</span>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4">
              {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4">
              {t("description")}
            </p>

            <p className="text-base sm:text-lg text-gray-700 font-medium mb-3 sm:mb-4 bg-gradient-to-r from-primary/10 to-purple-50 p-4 rounded-xl border border-primary/20">
              {t("additionalText")}
            </p>

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {qualities.map((quality, index) => (
                <div key={index} className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <span className="text-lg sm:text-xl md:text-2xl">{quality.icon}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-dark mb-0.5 sm:mb-1 text-sm sm:text-base">{quality.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-tight sm:leading-normal">{quality.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary rounded-xl sm:rounded-2xl p-3 sm:p-4 border-2 border-primary/20">
              <p className="text-base sm:text-lg font-semibold text-dark mb-1.5">
                {t("philosophy")}
              </p>
              <p className="text-dark italic text-sm sm:text-base">
                {t("philosophyQuote")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-dark mb-3 px-4">
            {t("comparison.title")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-gradient-to-br from-gray-50 to-white p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-gray-200">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-1.5 md:mb-2">🤖</div>
              <h4 className="font-semibold text-dark mb-1 sm:mb-1.5 text-sm sm:text-base md:text-lg">{t("comparison.typical.title")}</h4>
              <ul className="text-[11px] sm:text-xs md:text-sm text-gray-600 space-y-1 sm:space-y-1.5 text-left">
                <li>• {t("comparison.typical.items.0")}</li>
                <li>• {t("comparison.typical.items.1")}</li>
                <li>• {t("comparison.typical.items.2")}</li>
                <li>• {t("comparison.typical.items.3")}</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/90 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl shadow-xl text-white md:transform md:scale-105">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-1.5 md:mb-2">✨</div>
              <h4 className="font-semibold mb-1 sm:mb-1.5 text-sm sm:text-base md:text-lg">{t("comparison.lumi.title")}</h4>
              <ul className="text-[11px] sm:text-xs md:text-sm space-y-1 sm:space-y-1.5 text-left">
                <li>• {t("comparison.lumi.items.0")}</li>
                <li>• {t("comparison.lumi.items.1")}</li>
                <li>• {t("comparison.lumi.items.2")}</li>
                <li>• {t("comparison.lumi.items.3")}</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl border border-purple-200">
              <div className="text-2xl sm:text-3xl mb-1 sm:mb-1.5 md:mb-2">🚀</div>
              <h4 className="font-semibold text-dark mb-1 sm:mb-1.5 text-sm sm:text-base md:text-lg">{t("comparison.future.title")}</h4>
              <ul className="text-[11px] sm:text-xs md:text-sm text-gray-600 space-y-1 sm:space-y-1.5 text-left">
                <li>• {t("comparison.future.items.0")}</li>
                <li>• {t("comparison.future.items.1")}</li>
                <li>• {t("comparison.future.items.2")}</li>
                <li>• {t("comparison.future.items.3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
