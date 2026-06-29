"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Hero() {
  const t = useTranslations("hero");

  const scrollToFoundersClub = () => {
    document.getElementById("founders-club")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToWaitlist = () => {
    window.dispatchEvent(
      new CustomEvent("simplara:select-membership", { detail: "waitlist" })
    );
    document.getElementById("waitlist")?.scrollIntoView({ behavior: "smooth" });
  };

  const ctaButtons = (
    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
      <button
        onClick={scrollToWaitlist}
        className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 text-sm sm:text-base min-h-[44px]"
      >
        {t("joinWaitlist")}
      </button>
      <button
        onClick={scrollToFoundersClub}
        className="bg-dark hover:bg-gray-800 text-white font-semibold px-6 py-3.5 sm:px-8 sm:py-4 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl text-sm sm:text-base min-h-[44px]"
      >
        {t("joinFirst888")}
      </button>
    </div>
  );

  return (
    <section className="relative bg-secondary overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-72 h-72 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 -left-32 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-purple-200/30 rounded-full blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 sm:pt-24 pb-12 sm:pb-14 lg:pt-28 lg:pb-16">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* Copy */}
          <div className="text-center lg:text-left">
            <div className="mb-3 sm:mb-4">
              <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium text-gray-700 shadow-sm">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                {t("badge")}
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-dark mb-3 sm:mb-4 leading-tight">
              {t("title")}
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-600 mb-4 sm:mb-6">
              {t("subtitle")}
            </h2>

            {/* Buttons — desktop (shown in copy column) */}
            <div className="hidden lg:block">
              {ctaButtons}
            </div>

          </div>

          {/* Visual */}
          <div className="relative max-w-md mx-auto lg:max-w-none w-full">
            <div className="relative bg-gradient-to-br from-white via-white to-primary/5 rounded-3xl p-6 sm:p-8 shadow-xl border border-white/80">
              {/* Morning push card */}
              <div className="absolute -top-3 left-2 right-2 sm:left-4 sm:right-4 md:left-6 md:right-auto md:max-w-[280px] z-10">
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-2.5 sm:p-3 md:p-4 flex items-start gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden flex-shrink-0 border-2 border-primary/20">
                    <Image
                      src="/assets/lumi.png"
                      alt="LUMI"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] sm:text-xs font-bold text-gray-800">SIMPLARA</p>
                    <p className="text-xs sm:text-sm text-gray-700 leading-snug">{t("pushNotification")}</p>
                    <p className="text-[9px] sm:text-[10px] text-gray-400 mt-0.5 sm:mt-1">{t("visualMorning")}</p>
                  </div>
                </div>
              </div>

              {/* LUMI */}
              <div className="pt-16 sm:pt-20 pb-8 sm:pb-10 flex flex-col items-center justify-center">
                <div className="relative">
                  <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-primary/10 to-accent/20 flex items-center justify-center border-4 border-white shadow-xl overflow-hidden">
                    <Image
                      src="/assets/lumi.png"
                      alt="LUMI - AI style companion"
                      width={256}
                      height={256}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white text-sm font-semibold px-4 py-1.5 rounded-full shadow-md whitespace-nowrap">
                    {t("visualAskLumi")}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons — mobile (shown after Lumi image) */}
          <div className="lg:hidden mt-2">
            {ctaButtons}
          </div>
        </div>
      </div>
    </section>
  );
}
