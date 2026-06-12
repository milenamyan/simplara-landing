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
    <section className="py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Left: Visual */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Digital wardrobe visualization placeholder */}
              <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-3 sm:p-4 lg:p-6">
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <h3 className="text-base sm:text-lg font-semibold text-dark">{t("digitalWardrobe")}</h3>
                    <div className="text-xs sm:text-sm text-gray-500">124 {t("itemsCount")}</div>
                  </div>
                  
                  {/* Category tabs */}
                  <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
                    {categories.map((cat, i) => (
                      <button
                        key={cat}
                        className={`px-2.5 py-1.5 sm:px-3 sm:py-1.5 md:px-4 md:py-2 rounded-full text-[11px] sm:text-xs md:text-sm font-medium whitespace-nowrap flex-shrink-0 ${
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
                  <div className="grid grid-cols-3 gap-1.5 sm:gap-2 md:gap-3">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-md sm:rounded-lg md:rounded-xl border border-gray-200 flex items-center justify-center hover:shadow-md transition-shadow"
                      >
                        <div className="text-xl sm:text-2xl md:text-3xl opacity-50">
                          {["👕", "👖", "👟", "🧥", "👔", "👗", "🎽", "🩳", "👞"][i]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Weather widget */}
                <div className="flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 md:p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl md:rounded-2xl border border-indigo-100">
                  <div className="text-xl sm:text-2xl md:text-3xl flex-shrink-0">☀️</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] sm:text-xs md:text-sm font-medium text-gray-700 truncate">{t("todaysWeather")}</div>
                    <div className="text-[10px] sm:text-xs text-gray-500">22°C, {t("weatherCondition")}</div>
                  </div>
                  <button className="text-[11px] sm:text-xs md:text-sm font-semibold text-primary hover:text-primary/80 whitespace-nowrap flex-shrink-0">
                    {t("getOutfit")}
                  </button>
                </div>
              </div>

              {/* Floating AI badge */}
              <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 md:-top-4 md:-right-4 bg-gradient-to-r from-primary to-primary/90 text-white px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-full shadow-xl font-semibold text-[10px] sm:text-xs md:text-sm">
                {t("aiPowered")}
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4">
              {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
            </h2>
            
            <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
              {t("description")}
            </p>

            <div className="space-y-2 sm:space-y-3">
              {items.map((item, index) => (
                <div key={index} className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/50 transition-colors">
                  <div className="text-2xl sm:text-3xl flex-shrink-0">{item.icon}</div>
                  <div className="text-sm sm:text-base lg:text-lg font-medium text-dark">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-gradient-to-br from-primary/10 to-secondary rounded-xl sm:rounded-2xl border-2 border-primary/20">
              <p className="text-base sm:text-lg font-semibold text-dark">
                {t("cta")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
