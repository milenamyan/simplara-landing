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
    {
      number: "4",
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      icon: "✨",
    },
    {
      number: "5",
      title: t("steps.4.title"),
      description: t("steps.4.description"),
      icon: "⭐",
    },
    {
      number: "6",
      title: t("steps.5.title"),
      description: t("steps.5.description"),
      icon: "📊",
    },
  ];

  return (
    <section id="how-it-works" className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2 sm:mb-3 px-2">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="bg-white rounded-2xl p-3 sm:p-4 border-2 border-gray-100 hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-primary to-primary/90 rounded-xl sm:rounded-2xl flex items-center justify-center text-white text-xl sm:text-2xl font-bold mb-2 sm:mb-3 mx-auto shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-4xl sm:text-5xl mb-2 sm:mb-3 text-center">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-semibold text-dark mb-1.5 sm:mb-2 text-center">
                    {step.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-2 sm:my-3">
                    <div className="w-1 h-4 sm:h-6 bg-gradient-to-b from-primary to-primary/50"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 to-purple-50 rounded-xl sm:rounded-2xl px-4 py-3 sm:px-6 sm:py-4 border border-primary/20">
            <p className="text-base sm:text-lg font-semibold text-dark mb-1.5">
              {t("cta")}
            </p>
            <p className="text-sm sm:text-base text-gray-600">
              {t("ctaSubtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
