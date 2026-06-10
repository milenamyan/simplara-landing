"use client";

import { useTranslations } from "next-intl";

export default function Problem() {
  const t = useTranslations("problem");

  const problems = [
    {
      icon: "👔",
      title: t("problems.0.title"),
      description: t("problems.0.description"),
    },
    {
      icon: "⏰",
      title: t("problems.1.title"),
      description: t("problems.1.description"),
    },
    {
      icon: "🛍️",
      title: t("problems.2.title"),
      description: t("problems.2.description"),
    },
    {
      icon: "📦",
      title: t("problems.3.title"),
      description: t("problems.3.description"),
    },
  ];

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2 sm:mb-3 px-2">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl sm:text-5xl mb-2 sm:mb-3">{problem.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold text-dark mb-1.5">
                {problem.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 bg-gradient-to-br from-primary/5 to-purple-50 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center">
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-dark mb-2 sm:mb-3 px-2">
            {t("cta")}<span className="text-primary">{t("ctaHighlight")}</span>
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t("ctaSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
