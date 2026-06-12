"use client";

import { useTranslations } from "next-intl";

export default function BeforeAfter() {
  const t = useTranslations("beforeAfter");

  const comparisons = [0, 1, 2, 3, 4, 5].map((index) => ({
    before: t(`comparisons.${index}.before`),
    after: t(`comparisons.${index}.after`)
  }));

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-secondary to-purple-50 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">😰</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-gray-700">{t("beforeTitle")}</h3>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-2">✨</div>
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold text-primary">{t("afterTitle")}</h3>
            </div>
          </div>

          {/* Comparison Rows */}
          <div className="divide-y divide-gray-200">
            {comparisons.map((comparison, index) => (
              <div key={index} className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-6 hover:bg-white/50 transition-colors">
                <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 text-sm sm:text-base md:text-lg">✕</span>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-gray-700 leading-tight sm:leading-normal">{comparison.before}</p>
                </div>
                <div className="flex items-start gap-1.5 sm:gap-2 md:gap-3">
                  <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-primary text-sm sm:text-base md:text-lg">✓</span>
                  </div>
                  <p className="text-[11px] sm:text-xs md:text-sm lg:text-base font-semibold text-primary leading-tight sm:leading-normal">{comparison.after}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 font-medium max-w-3xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
