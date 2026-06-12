"use client";

import { useTranslations } from "next-intl";

export default function WhyComeback() {
  const t = useTranslations("whyComeback");

  const reasons = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => ({
    icon: ["🌅", "😌", "🧠", "📊", "🎯", "🏠", "⚔️", "💡"][index],
    text: t(`reasons.${index}`)
  }));

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reasons.map((reason, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-3xl sm:text-4xl mb-3 text-center">{reason.icon}</div>
              <p className="text-sm sm:text-base text-gray-700 text-center leading-relaxed">
                {reason.text}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 text-center bg-gradient-to-r from-primary/10 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-primary/20">
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-dark mb-2">
            {t("cta")}
          </p>
          <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            {t("ctaSubtext")}
          </p>
        </div>
      </div>
    </section>
  );
}
