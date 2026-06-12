"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export default function DailyScenario() {
  const t = useTranslations("dailyScenario");

  const bulletPoints = [0, 1, 2, 3, 4, 5, 6, 7].map((index) => 
    t(`bulletPoints.${index}`)
  );

  return (
    <section className="py-8 sm:py-10 lg:py-14 bg-gradient-to-b from-primary/5 to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center mb-8 sm:mb-10">
          {/* Left: Visual - Morning Push Scenario */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              {/* Phone mockup with push notification */}
              <div className="relative max-w-[280px] sm:max-w-sm mx-auto">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl sm:rounded-3xl md:rounded-[2.5rem] p-2 sm:p-3 md:p-4 shadow-2xl">
                  <div className="aspect-[9/19] bg-white rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden">
                    {/* Status bar */}
                    <div className="bg-gray-50 px-3 sm:px-4 py-1.5 sm:py-2 flex items-center justify-between text-[10px] sm:text-xs text-gray-600">
                      <span>9:41</span>
                      <div className="flex gap-0.5 sm:gap-1">
                        <span>📶</span>
                        <span>📡</span>
                        <span>🔋</span>
                      </div>
                    </div>

                    {/* Push notification */}
                    <div className="p-2 sm:p-3 md:p-4">
                      <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-200 p-2.5 sm:p-3 md:p-4 mb-3 sm:mb-4 animate-pulse">
                        <div className="flex items-start gap-2 sm:gap-3">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
                            <Image 
                              src="/assets/lumi.png" 
                              alt="LUMI" 
                              width={48} 
                              height={48}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-[10px] sm:text-xs md:text-sm text-dark mb-0.5 sm:mb-1">SIMPLARA</div>
                            <div className="text-[11px] sm:text-xs md:text-sm text-gray-700 font-medium leading-tight">{t("pushMessage")}</div>
                            <div className="text-[9px] sm:text-[10px] md:text-xs text-gray-500 mt-0.5 sm:mt-1">{t("pushTime")}</div>
                          </div>
                        </div>
                      </div>

                      {/* Outfit cards preview */}
                      <div className="space-y-2 sm:space-y-3">
                        {[
                          { label: t("option1"), color: "from-blue-50 to-indigo-50", border: "border-blue-200" },
                          { label: t("option2"), color: "from-gray-50 to-slate-50", border: "border-gray-300" },
                          { label: t("option3"), color: "from-purple-50 to-pink-50", border: "border-purple-200" }
                        ].map((option, index) => (
                          <div key={index} className={`bg-gradient-to-br ${option.color} rounded-lg sm:rounded-xl p-2 sm:p-2.5 md:p-3 border ${option.border}`}>
                            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                              <span className="text-[10px] sm:text-xs font-semibold text-gray-700 truncate">{option.label}</span>
                              <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                                <span className="text-[9px] sm:text-xs bg-white px-1.5 sm:px-2 py-0.5 rounded-full">☀️ 18°C</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                              <div className="aspect-square bg-white rounded-md sm:rounded-lg shadow-sm"></div>
                              <div className="aspect-square bg-white rounded-md sm:rounded-lg shadow-sm"></div>
                              <div className="aspect-square bg-white rounded-md sm:rounded-lg shadow-sm"></div>
                            </div>
                            <button className="w-full mt-1.5 sm:mt-2 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] sm:text-xs font-semibold py-1 sm:py-1.5 rounded-md sm:rounded-lg transition-colors">
                              {t("chooseButton")}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating time indicator */}
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-lg font-semibold text-xs sm:text-sm whitespace-nowrap">
                  ⏰ {t("morningTime")}
                </div>

                {/* LUMI character */}
                <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 md:-bottom-8 md:-right-8 w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 bg-white rounded-full shadow-2xl border-2 sm:border-4 border-primary/20 flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/assets/lumi.png" 
                    alt="LUMI" 
                    width={112} 
                    height={112}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
              <h3 className="text-xl sm:text-2xl font-bold text-dark mb-4">
                {t("contentTitle")}
              </h3>
              
              <p className="text-base sm:text-lg text-gray-700 mb-6 leading-relaxed">
                {t("contentText")}
              </p>

              <div className="space-y-2">
                {bulletPoints.map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3.5 h-3.5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-700">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="text-center bg-gradient-to-r from-primary to-primary/90 text-white rounded-2xl sm:rounded-3xl px-6 py-6 sm:py-8 shadow-xl">
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
            {t("highlight")}
          </p>
          <p className="text-sm sm:text-base text-white/90 max-w-2xl mx-auto">
            {t("highlightSubtext")}
          </p>
        </div>
      </div>
    </section>
  );
}
