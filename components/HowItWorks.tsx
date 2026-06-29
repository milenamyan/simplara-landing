"use client";

import { useTranslations } from "next-intl";

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    {
      number: "1",
      title: t("steps.0.title"),
      description: t("steps.0.description"),
      icon: "📸",
    },
    {
      number: "2",
      title: t("steps.1.title"),
      description: t("steps.1.description"),
      icon: "🤖",
    },
    {
      number: "3",
      title: t("steps.2.title"),
      description: t("steps.2.description"),
      icon: "🌅",
    },
  ];

  return (
    <section id="how-it-works" className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium max-w-2xl mx-auto px-4 mb-6">
            {t("subtitle")}
          </p>
        </div>

        {/* Main Feature Highlight */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8 border-2 border-primary/20 shadow-xl">
            <div className="text-center">
              <div className="text-5xl sm:text-6xl mb-4">🌅</div>
              <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-dark mb-3">
                {t("mainFeature.title")}
              </h3>
              <p className="text-base sm:text-lg text-gray-700">
                {t("mainFeature.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="bg-white rounded-xl sm:rounded-2xl p-5 sm:p-6 border-2 border-gray-100 hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary/90 rounded-xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-3 mx-auto shadow-lg">
                  {step.number}
                </div>
                <div className="text-4xl sm:text-5xl mb-3 text-center">{step.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-2 text-center">
                  {step.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 text-center leading-relaxed">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 text-primary text-2xl">
                  →
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-base sm:text-lg font-medium text-gray-700">
            {t("cta")}
          </p>
        </div>
      </div>
    </section>
  );
}
