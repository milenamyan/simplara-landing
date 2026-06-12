"use client";

import { useTranslations } from "next-intl";

export default function Features() {
  const t = useTranslations("features");

  const features = [
    {
      icon: "🎯",
      title: t("features.0.title"),
      description: t("features.0.description"),
      highlight: false,
    },
    {
      icon: "📱",
      title: t("features.1.title"),
      description: t("features.1.description"),
      highlight: false,
    },
    {
      icon: "🌤️",
      title: t("features.2.title"),
      description: t("features.2.description"),
      highlight: false,
    },
    {
      icon: "📅",
      title: t("features.3.title"),
      description: t("features.3.description"),
      highlight: false,
    },
    {
      icon: "📊",
      title: t("features.4.title"),
      description: t("features.4.description"),
      highlight: false,
    },
    {
      icon: "👔",
      title: t("features.5.title"),
      description: t("features.5.description"),
      highlight: true,
    },
    {
      icon: "🏠",
      title: t("features.6.title"),
      description: t("features.6.description"),
      highlight: true,
    },
    {
      icon: "⚔️",
      title: t("features.7.title"),
      description: t("features.7.description"),
      highlight: true,
    },
  ];

  const benefits = [
    {
      icon: "🔒",
      title: t("benefits.0.title"),
      description: t("benefits.0.description"),
    },
    {
      icon: "🌍",
      title: t("benefits.1.title"),
      description: t("benefits.1.description"),
    },
    {
      icon: "💰",
      title: t("benefits.2.title"),
      description: t("benefits.2.description"),
    },
  ];

  return (
    <section id="features" className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2 sm:mb-3 px-2">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 md:gap-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`p-3 sm:p-4 md:p-5 rounded-xl sm:rounded-2xl transition-all duration-300 hover:scale-105 ${
                feature.highlight
                  ? "bg-gradient-to-br from-primary/10 to-purple-50 border-2 border-primary/30 shadow-lg"
                  : "bg-white border border-gray-200 hover:shadow-lg"
              }`}
            >
              <div className="text-3xl sm:text-4xl md:text-5xl mb-1.5 sm:mb-2 md:mb-3">{feature.icon}</div>
              <h3 className="text-base sm:text-lg md:text-xl font-semibold text-dark mb-1 sm:mb-1.5">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-[11px] sm:text-xs md:text-sm leading-tight sm:leading-relaxed">
                {feature.description}
              </p>
              {feature.highlight && (
                <div className="mt-2 sm:mt-2.5 md:mt-3 inline-block">
                  <span className="text-[10px] sm:text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 sm:px-2.5 sm:py-1 md:px-3 rounded-full">
                    {t("comingSoon")}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 md:mt-10 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-5 text-center border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="text-2xl sm:text-3xl md:text-4xl mb-1 sm:mb-1.5 md:mb-2">{benefit.icon}</div>
              <h4 className="font-semibold text-dark mb-1 sm:mb-1.5 text-sm sm:text-base md:text-lg">{benefit.title}</h4>
              <p className="text-[11px] sm:text-xs md:text-sm text-gray-600 leading-tight sm:leading-normal">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
