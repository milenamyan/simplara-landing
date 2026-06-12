"use client";

import { useTranslations } from "next-intl";

export default function PrivacyTrust() {
  const t = useTranslations("privacyTrust");

  const points = [0, 1, 2, 3, 4].map((index) => ({
    icon: ["🔒", "✋", "🤝", "💜", "📊"][index],
    text: t(`points.${index}`)
  }));

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6">
          {points.map((point, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-secondary to-purple-50/50 rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 border border-gray-200 hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 md:mb-4 shadow-sm">
                {point.icon}
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 leading-relaxed">
                {point.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 text-center bg-gradient-to-r from-primary/10 to-purple-50 rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 border-2 border-primary/20">
          <div className="text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3">🛡️</div>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-dark max-w-2xl mx-auto px-4">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}
