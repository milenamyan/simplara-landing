"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";

export default function FAQ() {
  const t = useTranslations("faq");
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => ({
    question: t(`questions.${index}.question`),
    answer: t(`questions.${index}.answer`),
  }));

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-10 sm:py-12 md:py-16 lg:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-3 sm:mb-4 px-2">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/30 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 py-4 sm:px-5 sm:py-5 md:px-6 text-left flex items-center justify-between gap-3 sm:gap-4 hover:bg-gray-50 transition-colors min-h-[60px]"
              >
                <span className="font-semibold text-dark text-sm sm:text-base md:text-lg pr-2 sm:pr-4 leading-tight sm:leading-normal">
                  {faq.question}
                </span>
                <span
                  className={`flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-[500px]" : "max-h-0"
                }`}
              >
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 md:px-6 text-gray-600 leading-relaxed text-sm sm:text-base">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 sm:mt-10 md:mt-12 text-center bg-gradient-to-r from-secondary to-purple-50 rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-primary/20">
          <h3 className="text-lg sm:text-xl font-semibold text-dark mb-2 sm:mb-3 px-2">
            {t("stillQuestions")}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 px-4">
            {t("contactUs")}
          </p>
          <button
            type="button"
            className="bg-primary hover:bg-primary-dark text-white font-semibold px-6 py-3 sm:px-8 sm:py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 min-h-[44px] text-sm sm:text-base"
          >
            {t("contactButton")}
          </button>
        </div>
      </div>
    </section>
  );
}
