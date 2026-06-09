"use client";

import { validateEmail, validateTelegram } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function WaitlistForm() {
  const t = useTranslations("waitlist");
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    city: "",
    gender: "",
    ageRange: "",
    mvpTester: "",
    wardrobeSize: "",
    mainProblem: "",
    socialMedia: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [telegramTouched, setTelegramTouched] = useState(false);

  const emailValue = formData.email.trim();
  const telegramValue = formData.telegram.trim();
  const isEmailValid = validateEmail(emailValue);
  const isTelegramValid = validateTelegram(telegramValue);
  const showEmailError = emailTouched && !isEmailValid;
  const showTelegramError = telegramTouched && !isTelegramValid;
  const canSubmit = isEmailValid && isTelegramValid;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    setTelegramTouched(true);

    if (!canSubmit) {
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      // Get Google Script URL from environment variable
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("Google Script URL not configured. Please check GOOGLE_SHEETS_SETUP.md");
      }

      // URL-encoded form fields are the most reliable format for Google Apps Script (e.parameter)
      const body = new URLSearchParams({
        name: formData.name,
        email: emailValue,
        telegram: telegramValue,
        city: formData.city,
        gender: formData.gender,
        ageRange: formData.ageRange,
        mvpTester: formData.mvpTester,
        wardrobeSize: formData.wardrobeSize,
        mainProblem: formData.mainProblem,
        socialMedia: formData.socialMedia.trim(),
      });

      const response = await fetch(scriptUrl, {
        method: "POST",
        body,
      });

      const responseText = await response.text();
      let result: { success?: boolean; error?: string };
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error("Unexpected response from server. Please redeploy the Google Apps Script.");
      }

      if (!result.success) {
        throw new Error(result.error || "Submission failed");
      }

      setIsSubmitted(true);
      
    } catch (err) {
      console.error("Submission error:", err);
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="waitlist" className="py-16 lg:py-24 bg-gradient-to-b from-primary to-primary/90">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <div className="text-6xl mb-6">🎉</div>
            <h2 className="text-3xl font-bold text-dark mb-4">
              {t("success.title")}
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              {t("success.description")}
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-primary hover:text-primary/80 font-semibold"
            >
              {t("success.submitAnother")}
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="py-16 lg:py-24 bg-gradient-to-b from-secondary to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-dark mb-4">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100">
          <div className="mb-8 grid sm:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-4 text-center border border-primary/20">
              <div className="text-2xl mb-2">🎁</div>
              <p className="text-sm font-semibold text-dark">{t("benefits.earlyAccess")}</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-4 text-center border border-primary/20">
              <div className="text-2xl mb-2">💎</div>
              <p className="text-sm font-semibold text-dark">{t("benefits.foundersClub")}</p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-4 text-center border border-primary/20">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-sm font-semibold text-dark">{t("benefits.shapeProduct")}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                <p className="text-sm">{error}</p>
              </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-dark mb-2">
                {t("form.name")} {t("form.required")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                placeholder={t("form.namePlaceholder")}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-dark mb-2">
                {t("form.email")} {t("form.required")}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                autoComplete="email"
                inputMode="email"
                pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => setEmailTouched(true)}
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(t("form.emailInvalid"));
                }}
                onInput={(e) => {
                  e.currentTarget.setCustomValidity("");
                }}
                aria-invalid={showEmailError}
                aria-describedby={showEmailError ? "email-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:border-primary focus:outline-none transition-colors ${
                  showEmailError ? "border-red-400" : "border-gray-200"
                }`}
                placeholder={t("form.emailPlaceholder")}
              />
              {showEmailError && (
                <p id="email-error" className="text-sm text-red-600 mt-2" role="alert">
                  {t("form.emailInvalid")}
                </p>
              )}
            </div>

            {/* Telegram */}
            <div>
              <label htmlFor="telegram" className="block text-sm font-semibold text-dark mb-2">
                {t("form.telegram")} {t("form.required")}
              </label>
              <input
                type="text"
                id="telegram"
                name="telegram"
                required
                autoComplete="off"
                pattern="@[^\s@]+"
                value={formData.telegram}
                onChange={handleChange}
                onBlur={() => setTelegramTouched(true)}
                onInvalid={(e) => {
                  e.currentTarget.setCustomValidity(t("form.telegramInvalid"));
                }}
                onInput={(e) => {
                  e.currentTarget.setCustomValidity("");
                }}
                aria-invalid={showTelegramError}
                aria-describedby={showTelegramError ? "telegram-error" : undefined}
                className={`w-full px-4 py-3 rounded-xl border-2 focus:border-primary focus:outline-none transition-colors ${
                  showTelegramError ? "border-red-400" : "border-gray-200"
                }`}
                placeholder={t("form.telegramPlaceholder")}
              />
              {showTelegramError && (
                <p id="telegram-error" className="text-sm text-red-600 mt-2" role="alert">
                  {t("form.telegramInvalid")}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-sm font-semibold text-dark mb-2">
                {t("form.city")} {t("form.required")}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                placeholder={t("form.cityPlaceholder")}
              />
            </div>

            {/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-sm font-semibold text-dark mb-2">
                {t("form.gender")} {t("form.required")}
              </label>
              <select
                id="gender"
                name="gender"
                required
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white"
              >
                <option value="">{t("form.genderPlaceholder")}</option>
                <option value="female">{t("form.genderOptions.female")}</option>
                <option value="male">{t("form.genderOptions.male")}</option>
                <option value="non-binary">{t("form.genderOptions.nonBinary")}</option>
                <option value="prefer-not-to-say">{t("form.genderOptions.preferNotToSay")}</option>
              </select>
            </div>

            {/* Age Range */}
            <div>
              <label htmlFor="ageRange" className="block text-sm font-semibold text-dark mb-2">
                {t("form.ageRange")} {t("form.required")}
              </label>
              <select
                id="ageRange"
                name="ageRange"
                required
                value={formData.ageRange}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white"
              >
                <option value="">{t("form.ageRangePlaceholder")}</option>
                <option value="18-24">{t("form.ageRangeOptions.18-24")}</option>
                <option value="25-34">{t("form.ageRangeOptions.25-34")}</option>
                <option value="35-44">{t("form.ageRangeOptions.35-44")}</option>
                <option value="45+">{t("form.ageRangeOptions.45+")}</option>
              </select>
            </div>

            {/* MVP Tester */}
            <div>
              <label htmlFor="mvpTester" className="block text-sm font-semibold text-dark mb-2">
                {t("form.mvpTester")} {t("form.required")}
              </label>
              <select
                id="mvpTester"
                name="mvpTester"
                required
                value={formData.mvpTester}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white"
              >
                <option value="">{t("form.mvpTesterPlaceholder")}</option>
                <option value="yes">{t("form.mvpTesterOptions.yes")}</option>
                <option value="no">{t("form.mvpTesterOptions.no")}</option>
              </select>
            </div>

            {/* Wardrobe Size */}
            <div>
              <label htmlFor="wardrobeSize" className="block text-sm font-semibold text-dark mb-2">
                {t("form.wardrobeSize")} {t("form.required")}
              </label>
              <select
                id="wardrobeSize"
                name="wardrobeSize"
                required
                value={formData.wardrobeSize}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white"
              >
                <option value="">{t("form.wardrobeSizePlaceholder")}</option>
                <option value="0-50">{t("form.wardrobeSizeOptions.0-50")}</option>
                <option value="51-100">{t("form.wardrobeSizeOptions.51-100")}</option>
                <option value="101-200">{t("form.wardrobeSizeOptions.101-200")}</option>
                <option value="201-300">{t("form.wardrobeSizeOptions.201-300")}</option>
                <option value="300+">{t("form.wardrobeSizeOptions.300+")}</option>
              </select>
            </div>

            {/* Main Problem */}
            <div>
              <label htmlFor="mainProblem" className="block text-sm font-semibold text-dark mb-2">
                {t("form.mainProblem")} {t("form.required")}
              </label>
              <select
                id="mainProblem"
                name="mainProblem"
                required
                value={formData.mainProblem}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors bg-white"
              >
                <option value="">{t("form.mainProblemPlaceholder")}</option>
                <option value="nothing-to-wear">{t("form.mainProblemOptions.nothingToWear")}</option>
                <option value="unused-items">{t("form.mainProblemOptions.unusedItems")}</option>
                <option value="no-combinations">{t("form.mainProblemOptions.noCombinations")}</option>
                <option value="want-organize">{t("form.mainProblemOptions.wantOrganize")}</option>
                <option value="other">{t("form.mainProblemOptions.other")}</option>
              </select>
            </div>

            {/* Social Media (Optional) */}
            <div>
              <label htmlFor="socialMedia" className="block text-sm font-semibold text-dark mb-2">
                {t("form.socialMedia")} <span className="text-gray-400">{t("form.socialMediaOptional")}</span>
              </label>
              <input
                type="text"
                id="socialMedia"
                name="socialMedia"
                value={formData.socialMedia}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors"
                placeholder={t("form.socialMediaPlaceholder")}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !canSubmit}
              className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary-dark hover:to-primary text-white font-semibold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t("form.submitting")}
                </span>
              ) : (
                t("form.submit")
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-4">
              {t("form.privacy")}
            </p>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">{t("benefitsList.title")}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {[0, 1, 2, 3, 4].map((index) => (
              <span
                key={index}
                className="bg-white border border-gray-200 rounded-full px-4 py-2 text-sm text-gray-700"
              >
                ✓ {t(`benefitsList.items.${index}`)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
