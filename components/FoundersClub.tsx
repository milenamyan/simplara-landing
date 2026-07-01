"use client";

import { FOUNDERS_CLUB_ENABLED } from "@/lib/features";
import { useTranslations } from "next-intl";

const TOTAL_SPOTS = 888;

function FoundersClubFullContent() {
  const t = useTranslations("foundersClub");

  const goToWaitlist = (membershipType: "founders" | "waitlist") => {
    window.dispatchEvent(
      new CustomEvent("simplara:select-membership", { detail: membershipType })
    );
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    { icon: "🏅", index: 0 },
    { icon: "🚀", index: 1 },
    { icon: "💬", index: 2 },
    { icon: "🎯", index: 3 },
    { icon: "🎁", index: 4 },
    { icon: "🎉", index: 5 },
    { icon: "✨", index: 6 },
    { icon: "📜", index: 7 },
  ];

  return (
    <>
      <div className="text-center mb-8 sm:mb-10">
        <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-semibold text-primary mb-3 sm:mb-4">
          <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          {t("badge")}
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2 sm:mb-3 px-2">
          {t("title")}
        </h2>
        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
          {t("subtitle")}
        </p>
      </div>

      {/* Pricing Card - Featured */}
      <div className="max-w-2xl mx-auto mb-8 sm:mb-12">
        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-xl sm:rounded-2xl md:rounded-3xl p-6 sm:p-8 text-white shadow-2xl">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 mb-4 shadow-lg border-4 border-white/30">
              <span className="text-4xl sm:text-5xl">🏅</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">{t("pricing.title")}</h3>
            <div className="flex items-baseline justify-center gap-2 mb-4">
              <span className="text-5xl sm:text-6xl font-bold">{t("pricing.price")}</span>
              <span className="text-white/80 text-lg">{t("pricing.firstTier")}</span>
            </div>
            <p className="text-white/90 mb-2">{t("pricing.thenIncreases")}</p>
            <div className="bg-white/15 backdrop-blur-sm rounded-lg p-4 mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-white/90">{t("pricing.totalSpots")}</span>
                <span className="font-bold">{TOTAL_SPOTS}</span>
              </div>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                <div className="h-full w-0 bg-accent rounded-full transition-all" />
              </div>
              <p className="text-xs text-white/70 mt-2">{t("pricing.closesForever")}</p>
            </div>
          </div>

          <div className="space-y-2 mb-6 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t("pricing.oneTime")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t("pricing.noSubscription")}</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{t("pricing.noHiddenFees")}</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => goToWaitlist("founders")}
            className="w-full bg-white hover:bg-gray-50 text-primary font-bold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-base min-h-[44px]"
          >
            {t("cta")}
          </button>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">{t("benefitsTitle")}</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {benefits.map(({ icon, index }) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-4 sm:p-5 border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all"
            >
              <div className="text-3xl sm:text-4xl mb-3">{icon}</div>
              <h4 className="text-base sm:text-lg font-bold text-dark mb-2">
                {t(`benefits.${index}.title`)}
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {t(`benefits.${index}.description`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-sm text-gray-500 px-4">
        {t("freeWaitlist")}{" "}
        <button
          onClick={() => goToWaitlist("waitlist")}
          className="text-primary hover:text-primary-dark font-semibold underline-offset-2 hover:underline min-h-[44px] inline-flex items-center"
        >
          {t("freeWaitlistLink")}
        </button>
      </p>
    </>
  );
}

function FoundersClubComingSoon() {
  const t = useTranslations("foundersClub");

  const scrollToWaitlist = () => {
    window.dispatchEvent(
      new CustomEvent("simplara:select-membership", { detail: "waitlist" })
    );
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="max-w-2xl mx-auto text-center py-6 sm:py-10">
      <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 mb-6 shadow-lg border-4 border-white">
        <span className="text-3xl sm:text-4xl">🏅</span>
      </div>
      <div className="inline-flex items-center gap-2.5 bg-gradient-to-r from-amber-400 to-amber-500 border-2 border-amber-300 rounded-full px-6 py-3 sm:px-8 sm:py-3.5 text-base sm:text-lg font-bold text-amber-950 mb-5 shadow-lg shadow-amber-200/60 ring-4 ring-amber-100">
        <span className="w-2.5 h-2.5 bg-amber-900 rounded-full animate-pulse" />
        {t("comingSoon.badge")}
      </div>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-dark mb-3 px-2">
        {t("title")}
      </h2>
      <p className="text-base sm:text-lg text-gray-600 max-w-xl mx-auto px-4 mb-8">
        {t("comingSoon.message")}
      </p>
      <button
        type="button"
        onClick={scrollToWaitlist}
        className="bg-primary hover:bg-primary-dark text-white font-bold px-10 py-4 sm:px-12 sm:py-5 rounded-full transition-all duration-200 shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/30 active:scale-95 text-base sm:text-lg min-h-[52px] ring-2 ring-primary/20 hover:ring-primary/40"
      >
        {t("comingSoon.cta")}
      </button>
    </div>
  );
}

export default function FoundersClub() {
  return (
    <section id="founders-club" className="py-8 sm:py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {FOUNDERS_CLUB_ENABLED ? <FoundersClubFullContent /> : <FoundersClubComingSoon />}
      </div>
    </section>
  );
}
