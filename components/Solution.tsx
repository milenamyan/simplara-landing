"use client";

import { useTranslations } from "next-intl";

export default function Solution() {
  const t = useTranslations("solution");

  const categories = [
    t("categories.all"),
    t("categories.tops"),
    t("categories.bottoms"),
    t("categories.shoes"),
    t("categories.accessories")
  ];

  const items = [
    { icon: "🎨", label: t("items.0") },
    { icon: "🌤️", label: t("items.1") },
    { icon: "📅", label: t("items.2") },
    { icon: "🤝", label: t("items.3") },
    { icon: "💡", label: t("items.4") },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-secondary to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Digital wardrobe visualization placeholder */}
              <div className="bg-white rounded-3xl shadow-2xl p-6 lg:p-8">
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-dark">{t("digitalWardrobe")}</h3>
                    <div className="text-sm text-gray-500">124 {t("itemsCount")}</div>
                  </div>
                  
                  {/* Category tabs */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {categories.map((cat, i) => (
                      <button
                        key={cat}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${
                          i === 0
                            ? "bg-primary text-white"
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Clothing grid */}
                  <div className="grid grid-cols-3 gap-4">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
                      >
                        <div className="text-3xl opacity-50">
                          {["👕", "👖", "👟", "🧥", "👔", "👗", "🎽", "🩳", "👞"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weather widget */}
                <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-indigo-100">
                  <div className="text-3xl">☀️</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-gray-700">{t("todaysWeather")}</div>
                    <div className="text-xs text-gray-500">22°C, {t("weatherCondition")}</div>
                  </div>
                  <button className="text-sm font-semibold text-primary hover:text-primary/80">
                    {t("getOutfit")}
                  </button>
                </div>
              </div>

              {/* Floating AI badge */}
              <div className="absolute -top-4 -right-4 bg-gradient-to-r from-primary to-indigo-600 text-white px-6 py-3 rounded-full shadow-xl font-semibold text-sm">
                {t("aiPowered")}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-6">
              {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            
            <p className="text-lg text-gray-600 mb-8">
              {t("description")}
            </p>

            <div className="space-y-4">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/50 transition-colors">
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-lg font-medium text-dark">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-accent/30 to-yellow-50 rounded-2xl border-2 border-yellow-200">
              <p className="text-lg font-semibold text-dark">
                {t("cta")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
