"use client";

import { useTranslations } from "next-intl";

const TOTAL_SPOTS = 888;

export default function FoundersClub() {
  const t = useTranslations("foundersClub");

  const benefits = [
    { icon: "🏅", index: 0 },
    { icon: "💬", index: 1 },
    { icon: "🚀", index: 2 },
    { icon: "🎁", index: 3 },
  ];

  return (
    <section id="founders-club" className="py-8 sm:py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-primary mb-3 sm:mb-4">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            {t("badge")}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2 sm:mb-3 px-2">
            {t("title")}
            <span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-6 sm:gap-8 items-stretch">
          {/* Pricing card */}
          <div className="lg:col-span-2">
            <div className="h-full bg-gradient-to-br from-primary to-primary-dark rounded-xl sm:rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-8 text-white shadow-2xl flex flex-col">
              <div className="flex-1">
                <p className="text-xs sm:text-sm md:text-base text-white/80 font-medium mb-1">
                  {t("priceLabel")}
                </p>
                <div className="flex items-baseline gap-1 mb-3 sm:mb-4 md:mb-6">
                  <span className="text-4xl sm:text-5xl md:text-6xl font-bold">{t("price")}</span>
                </div>

                <div className="bg-white/15 backdrop-blur-sm rounded-lg sm:rounded-xl p-3 sm:p-4 mb-4 sm:mb-5 md:mb-6">
                  <div className="flex items-center justify-between text-xs sm:text-sm md:text-base mb-1.5 sm:mb-2">
                    <span className="text-white/90">{t("spotsLabel")}</span>
                    <span className="font-bold">{TOTAL_SPOTS}</span>
                  </div>
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-accent rounded-full transition-all" />
                  </div>
                  <p className="text-[10px] sm:text-xs md:text-sm text-white/70 mt-1.5 sm:mt-2">{t("spotsNote")}</p>
                </div>

                <div className="flex items-center justify-center mb-4 sm:mb-5 md:mb-6">
                  <div className="relative">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 flex items-center justify-center shadow-lg border-2 sm:border-4 border-white/30">
                      <span className="text-3xl sm:text-4xl md:text-5xl">🏅</span>
                    </div>
                    <div className="absolute -bottom-1.5 sm:-bottom-2 left-1/2 -translate-x-1/2 bg-white text-primary text-[9px] sm:text-[10px] md:text-xs font-bold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full shadow-md whitespace-nowrap">
                      FOUNDER
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="w-full bg-white hover:bg-gray-50 text-primary font-bold px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 rounded-lg sm:rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-xs sm:text-sm md:text-base min-h-[44px]"
              >
                {t("cta")}
              </button>
              <p className="text-[10px] sm:text-xs text-white/70 text-center mt-2 sm:mt-3">{t("ctaNote")}</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-3 sm:gap-4">
            {benefits.map(({ icon, index }) => (
              <div
                key={index}
                className="bg-secondary rounded-lg sm:rounded-xl md:rounded-2xl p-3 sm:p-4 md:p-6 border border-gray-100 hover:border-primary/20 hover:shadow-md transition-all"
              >
                <div className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 md:mb-3">{icon}</div>
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-dark mb-1 sm:mb-1.5 md:mb-2">
                  {t(`benefits.${index}.title`)}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {t(`benefits.${index}.description`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-5 sm:mt-6 md:mt-8 px-4">
          {t("freeWaitlist")}{" "}
          <button
            onClick={() => document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" })}
            className="text-primary hover:text-primary-dark font-semibold underline-offset-2 hover:underline min-h-[44px] inline-flex items-center"
          >
            {t("freeWaitlistLink")}
          </button>
        </p>
      </div>
    </section>
  );
}
