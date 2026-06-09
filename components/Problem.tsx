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
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-2xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-5xl mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold text-dark mb-2">
                {problem.title}
              </h3>
              <p className="text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-br from-primary/5 to-purple-50 rounded-3xl p-8 lg:p-12 text-center">
          <p className="text-2xl lg:text-3xl font-semibold text-dark mb-4">
            {t("cta")}<span className="text-primary">{t("ctaHighlight")}</span>
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("ctaSubtitle")}
          </p>
        </div>
      </div>
    </section>
  );
}
