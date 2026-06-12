"use client";

import { useTranslations } from "next-intl";

export default function BrandManifesto() {
  const t = useTranslations("brandManifesto");

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 md:mb-6 px-2">
          {t("title")}
        </h2>
        
        <div className="space-y-2.5 sm:space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <p className="font-medium px-2">
            {t("line1")}
          </p>
          <p className="px-2">
            {t("line2")}
          </p>
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-primary/10 to-purple-50 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-5 sm:py-3.5 md:px-6 md:py-4 border-2 border-primary/20">
          <span className="text-2xl sm:text-3xl md:text-4xl flex-shrink-0">✨</span>
          <p className="text-xs sm:text-sm md:text-base font-semibold text-dark text-left">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}
