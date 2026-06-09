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
      icon: "✨",
    },
    {
      number: "4",
      title: t("steps.3.title"),
      description: t("steps.3.description"),
      icon: "⭐",
    },
    {
      number: "5",
      title: t("steps.4.title"),
      description: t("steps.4.description"),
      icon: "📊",
    },
  ];

  return (
    <section id="how-it-works" className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

          <div className="grid lg:grid-cols-5 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Step card */}
                <div className="bg-white rounded-2xl p-6 border-2 border-gray-100 hover:border-primary/50 hover:shadow-lg transition-all duration-300 h-full">
                  {/* Number badge */}
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-primary/90 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 mx-auto shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="text-5xl mb-4 text-center">{step.icon}</div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-dark mb-3 text-center">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-center">
                    {step.description}
                  </p>
                </div>

                {/* Mobile connector */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden flex justify-center my-4">
                    <div className="w-1 h-8 bg-gradient-to-b from-primary to-primary/50"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-primary/10 to-purple-50 rounded-2xl px-8 py-6 border border-primary/20">
            <p className="text-lg font-semibold text-dark mb-2">
              {t("cta")}
            </p>
            <p className="text-gray-600">
              {t("ctaSubtitle")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
