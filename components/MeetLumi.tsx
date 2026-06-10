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
            <div className="relative bg-gradient-to-br from-purple-100 via-pink-50 to-indigo-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-primary/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-40 sm:h-40 bg-purple-300/20 rounded-full blur-3xl"></div>
              
              {/* LUMI mascot - large */}
              <div className="relative z-10 flex justify-center">
                <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 sm:border-6 border-primary/20 overflow-hidden">
                  <Image 
                    src="/assets/lumi.png" 
                    alt="LUMI - Your AI Fashion Companion" 
                    width={256} 
                    height={256}
                    className="w-full h-full object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating speech bubble */}
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-4 max-w-[160px] sm:max-w-xs animate-bounce z-50">
                <p className="text-xs sm:text-sm font-medium text-dark">
                  {t("speechBubble")}
                </p>
                <div className="absolute -bottom-1.5 sm:-bottom-2 right-6 sm:right-8 w-3 h-3 sm:w-4 sm:h-4 bg-white transform rotate-45"></div>
              </div>

              {/* Floating icons */}
              <div className="absolute bottom-6 left-3 sm:bottom-8 sm:left-6 bg-white rounded-full p-2 sm:p-2.5 shadow-lg">
                <span className="text-lg sm:text-xl">✨</span>
              </div>
              <div className="absolute top-1/2 left-2 sm:left-3 bg-white rounded-full p-2 sm:p-2.5 shadow-lg">
                <span className="text-lg sm:text-xl">👕</span>
              </div>
              <div className="hidden sm:block absolute top-16 left-1/3 bg-white rounded-full p-2.5 shadow-lg">
                <span className="text-xl">🎨</span>
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

            <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
              {qualities.map((quality, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg sm:rounded-xl flex items-center justify-center">
                    <span className="text-xl sm:text-2xl">{quality.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-dark mb-1 text-sm sm:text-base">{quality.title}</h3>
                    <p className="text-gray-600 text-xs sm:text-base">{quality.description}</p>
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
          <h3 className="text-xl sm:text-2xl font-bold text-dark mb-3 px-4">
            {t("comparison.title")}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
            <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-5 rounded-2xl border border-gray-200">
              <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">🤖</div>
              <h4 className="font-semibold text-dark mb-1.5 text-base sm:text-lg">{t("comparison.typical.title")}</h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-1.5 text-left">
                <li>• {t("comparison.typical.items.0")}</li>
                <li>• {t("comparison.typical.items.1")}</li>
                <li>• {t("comparison.typical.items.2")}</li>
                <li>• {t("comparison.typical.items.3")}</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-primary to-primary/90 p-4 sm:p-5 rounded-2xl shadow-xl text-white md:transform md:scale-105">
              <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">✨</div>
              <h4 className="font-semibold mb-1.5 text-base sm:text-lg">{t("comparison.lumi.title")}</h4>
              <ul className="text-xs sm:text-sm space-y-1 sm:space-y-1.5 text-left">
                <li>• {t("comparison.lumi.items.0")}</li>
                <li>• {t("comparison.lumi.items.1")}</li>
                <li>• {t("comparison.lumi.items.2")}</li>
                <li>• {t("comparison.lumi.items.3")}</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-4 sm:p-5 rounded-2xl border border-purple-200">
              <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">🚀</div>
              <h4 className="font-semibold text-dark mb-1.5 text-base sm:text-lg">{t("comparison.future.title")}</h4>
              <ul className="text-xs sm:text-sm text-gray-600 space-y-1 sm:space-y-1.5 text-left">
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
