"use client";

import { useTranslations } from "next-intl";

export default function BrandManifesto() {
  const t = useTranslations("brandManifesto");

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50/30 via-transparent to-pink-50/30 pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-4 sm:mb-6 px-2">
          {t("title")}
        </h2>
        
        <div className="space-y-3 sm:space-y-4 text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto">
          <p className="font-medium">
            {t("line1")}
          </p>
          <p>
            {t("line2")}
          </p>
        </div>

        <div className="mt-8 sm:mt-10 inline-flex items-center gap-3 bg-gradient-to-r from-primary/10 to-purple-50 rounded-2xl px-6 py-4 border-2 border-primary/20">
          <span className="text-3xl sm:text-4xl">✨</span>
          <p className="text-sm sm:text-base font-semibold text-dark text-left">
            {t("tagline")}
          </p>
        </div>
      </div>
    </section>
  );
}
