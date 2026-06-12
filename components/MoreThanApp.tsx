"use client";

import { useTranslations } from "next-intl";

export default function MoreThanApp() {
  const t = useTranslations("moreThanApp");

  const features = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => ({
    icon: ["👕", "🤖", "🌅", "📊", "🏠", "⚔️", "🛍️", "🔗"][index],
    text: t(`features.${index}`)
  }));

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-gradient-to-b from-primary/5 to-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="bg-gradient-to-br from-white to-purple-50/50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 shadow-xl border border-gray-200 mb-8">
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 text-center leading-relaxed max-w-4xl mx-auto mb-6 sm:mb-8">
            {t("description")}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-4 text-center border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all"
              >
                <div className="text-2xl sm:text-3xl mb-2">{feature.icon}</div>
                <p className="text-xs sm:text-sm font-semibold text-gray-700">
                  {feature.text}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl text-center">
          <div className="text-3xl sm:text-4xl mb-4">🚀</div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3">
            {t("futureTitle")}
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-white/90 max-w-3xl mx-auto">
            {t("futureDescription")}
          </p>
        </div>
      </div>
    </section>
  );
}
