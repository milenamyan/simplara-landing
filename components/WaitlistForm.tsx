"use client";

import { FOUNDERS_CLUB_ENABLED } from "@/lib/features";
import { validateEmail, validateTelegram } from "@/lib/utils";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";

const SUBMITTED_COOKIE = "simplara_waitlist_submitted";

const hasSubmittedCookie = () => {
  if (typeof document === "undefined") {
    return false;
  }

  return document.cookie.split("; ").some((row) => row.startsWith(`${SUBMITTED_COOKIE}=true`));
};

const setSubmittedCookie = () => {
  document.cookie = `${SUBMITTED_COOKIE}=true; max-age=${60 * 60 * 24 * 365}; path=/; samesite=lax`;
};

export default function WaitlistForm() {
  const t = useTranslations("waitlist");
  const tFounders = useTranslations("foundersClub");
  
  const [formData, setFormData] = useState({
    // Step 1: Essential fields
    membershipType: FOUNDERS_CLUB_ENABLED ? "" : "waitlist", // "waitlist" or "founders"
    name: "",
    email: "",
    telegram: "",
    city: "",
    tgChannelAccess: false,
    mvpTester: "",
    // Step 2: Optional detailed fields
    gender: "",
    ageRange: "",
    wardrobeSize: "",
    mainProblem: "",
    instagram: "",
    tiktok: "",
  });
  const [geoData, setGeoData] = useState({
    ip: "",
    country: "",
    region: "",
    city: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasAlreadySignedUp, setHasAlreadySignedUp] = useState(false);
  const [showStep2, setShowStep2] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
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
  const effectiveMembershipType = FOUNDERS_CLUB_ENABLED ? formData.membershipType : "waitlist";
  const isFounder = effectiveMembershipType === "founders";
  const canSubmitStep2 =
    !!formData.gender &&
    !!formData.ageRange &&
    !!formData.wardrobeSize &&
    !!formData.mainProblem &&
    !!formData.instagram.trim();
  const canSubmitStep1 =
    isEmailValid &&
    isTelegramValid &&
    formData.name &&
    formData.city &&
    formData.tgChannelAccess &&
    (FOUNDERS_CLUB_ENABLED ? formData.membershipType : true) &&
    (isFounder || formData.mvpTester);

  // Keep the form/section in view across steps: step 2, payment, and success
  useEffect(() => {
    if (showStep2 || showPayment || isSubmitted) {
      document
        .getElementById("waitlist")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showStep2, showPayment, isSubmitted]);

  useEffect(() => {
    if (hasSubmittedCookie()) {
      setHasAlreadySignedUp(true);
    }
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadGeoData = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (!isCancelled) {
          setGeoData({
            ip: data.ip || "",
            country: data.country_name || data.country_code || "",
            region: data.region || "",
            city: data.city || "",
          });
        }
      } catch {
        // Ignore geo lookup failures and submit the form without location data.
      }
    };

    void loadGeoData();

    return () => {
      isCancelled = true;
    };
  }, []);

  // Allow other sections (e.g. "Become a Founder" buttons) to preselect a membership type
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "waitlist" || (FOUNDERS_CLUB_ENABLED && detail === "founders")) {
        setFormData(prev => ({ ...prev, membershipType: detail }));
      }
    };
    window.addEventListener("simplara:select-membership", handler);
    return () => window.removeEventListener("simplara:select-membership", handler);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!showStep2) {
      // First step - validate and show step 2
      setEmailTouched(true);
      setTelegramTouched(true);

      if (!canSubmitStep1) {
        return;
      }

      // Show step 2 form
      setShowStep2(true);
      return;
    }

    // Step 2 - Submit everything
    if (!canSubmitStep2) {
      setError(t("form.step2RequiredError"));
      return;
    }

    setIsSubmitting(true);
    setError("");
    
    try {
      // Validate membershipType is selected
      if (!effectiveMembershipType) {
        throw new Error("Please select a membership type");
      }

      // Get Google Script URL from environment variable
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
      
      if (!scriptUrl) {
        throw new Error("Google Script URL not configured. Please check GOOGLE_SHEETS_SETUP.md");
      }

      // Record a clear access type: Founder, MVP Tester, or Early Access
      const mvpTesterValue = isFounder
        ? "Founder"
        : formData.mvpTester === "yes"
          ? "MVP Tester"
          : "Early Access";

      // URL-encoded form fields are the most reliable format for Google Apps Script (e.parameter)
      const body = new URLSearchParams({
        membershipType: effectiveMembershipType,
        name: formData.name,
        email: emailValue,
        telegram: telegramValue,
        city: formData.city,
      tgChannelAccess: formData.tgChannelAccess ? "yes" : "no",
        gender: formData.gender,
        ageRange: formData.ageRange,
        mvpTester: mvpTesterValue,
        wardrobeSize: formData.wardrobeSize,
        mainProblem: formData.mainProblem,
        instagram: formData.instagram.trim(),
        tiktok: formData.tiktok.trim(),
        ip: geoData.ip,
        geoCountry: geoData.country,
        geoCity: geoData.city,
      });

      // Debug: Log what we're sending
      console.log("Submitting form data:", {
        membershipType: effectiveMembershipType,
        name: formData.name,
        email: emailValue,
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

      setSubmittedCookie();

      // Founders go to the payment step; waitlist users go straight to success
      if (isFounder) {
        setShowPayment(true);
      } else {
        setIsSubmitted(true);
      }
      
    } catch (err) {
      console.error("Submission error:", err);
      setError(t("error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
    <section id="waitlist" className="scroll-mt-20 py-8 sm:py-10 lg:py-14 bg-gradient-to-b from-primary to-primary/90">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
          <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-2 sm:mb-3">
            {t("success.title")}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mb-4 sm:mb-6">
            {t("success.description")}
          </p>
          </div>
        </div>
      </section>
    );
  }

  if (hasAlreadySignedUp) {
    return (
      <section id="waitlist" className="scroll-mt-20 py-8 sm:py-10 lg:py-14 bg-gradient-to-b from-primary to-primary/90">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="text-5xl sm:text-6xl mb-3 sm:mb-4">🎉</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-2 sm:mb-3">
              {t("success.alreadySignedUpTitle")}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {t("success.alreadySignedUp")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="waitlist" className="scroll-mt-20 py-8 sm:py-10 lg:py-14 bg-secondary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-dark mb-2 sm:mb-3 px-2">
            {t("title")}<span className="text-primary">{t("titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            {t("subtitle")}
          </p>
        </div>

        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl p-4 sm:p-6 lg:p-8 border border-gray-100">
          {!showStep2 ? (
            // STEP 1: Quick signup form
            <>
              <div className="mb-4 sm:mb-6 text-center">
                <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">{t("form.step1Title")}</h3>
                <p className="text-sm sm:text-base text-gray-600">{t("form.step1Subtitle")}</p>
              </div>
              
              <div className="mb-4 sm:mb-6 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-3 sm:p-4 text-center border border-primary/20">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎁</div>
                  <p className="text-xs sm:text-sm font-semibold text-dark">{t("benefits.earlyAccess")}</p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-3 sm:p-4 text-center border border-primary/20">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">💎</div>
                  <p className="text-xs sm:text-sm font-semibold text-dark">
                    {FOUNDERS_CLUB_ENABLED
                      ? t("benefits.foundersClub")
                      : tFounders("comingSoon.badge")}
                  </p>
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-xl p-3 sm:p-4 text-center border border-primary/20">
                  <div className="text-xl sm:text-2xl mb-1 sm:mb-2">🎯</div>
                  <p className="text-xs sm:text-sm font-semibold text-dark">{t("benefits.shapeProduct")}</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded-xl">
                    <p className="text-xs sm:text-sm">{error}</p>
                  </div>
                )}

            {/* Membership Type Selection — hidden until Founders Club launches */}
            {FOUNDERS_CLUB_ENABLED && (
            <div className="mb-6">
              <label className="block text-xs sm:text-sm font-semibold text-dark mb-3">
                {t("form.membershipType")} {t("form.required")}
              </label>
              <div className={`grid gap-3 sm:gap-4 ${FOUNDERS_CLUB_ENABLED ? "sm:grid-cols-2" : ""}`}>
                {/* Free Waitlist Option */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, membershipType: "waitlist" }))}
                  className={`relative p-4 sm:p-5 rounded-xl border-2 transition-all text-left min-h-[44px] ${
                    formData.membershipType === "waitlist"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      formData.membershipType === "waitlist"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}>
                      {formData.membershipType === "waitlist" && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-dark text-sm sm:text-base mb-1">
                        {t("form.membershipOptions.waitlist.title")}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {t("form.membershipOptions.waitlist.description")}
                      </div>
                      <div className="mt-2 inline-block bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {t("form.membershipOptions.waitlist.price")}
                      </div>
                    </div>
                  </div>
                </button>

                {FOUNDERS_CLUB_ENABLED && (
                <>
                {/* Founders Club Option */}
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, membershipType: "founders" }))}
                  className={`relative p-4 sm:p-5 rounded-xl border-2 transition-all text-left min-h-[44px] ${
                    formData.membershipType === "founders"
                      ? "border-primary bg-primary/5 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="absolute -top-2 -right-2 bg-amber-400 text-dark text-[10px] font-bold px-2 py-1 rounded-full shadow-md">
                    🏅 {t("form.membershipOptions.founders.badge")}
                  </div>
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      formData.membershipType === "founders"
                        ? "border-primary bg-primary"
                        : "border-gray-300"
                    }`}>
                      {formData.membershipType === "founders" && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-bold text-dark text-sm sm:text-base mb-1">
                        {t("form.membershipOptions.founders.title")}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600">
                        {t("form.membershipOptions.founders.description")}
                      </div>
                      <div className="mt-2 inline-block bg-amber-100 text-amber-800 text-xs font-semibold px-2 py-1 rounded-full">
                        {t("form.membershipOptions.founders.price")}
                      </div>
                    </div>
                  </div>
                </button>
              {formData.membershipType === "founders" && (
                <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-xs sm:text-sm text-amber-800">
                    💳 {t("form.membershipOptions.founders.paymentNote")}
                  </p>
                </div>
              )}
                </>
                )}
              </div>
            </div>
            )}

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.name")} {t("form.required")}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                placeholder={t("form.namePlaceholder")}
              />
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
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
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base min-h-[44px] ${
                  showEmailError ? "border-red-400" : "border-gray-200"
                }`}
                placeholder={t("form.emailPlaceholder")}
              />
              {showEmailError && (
                <p id="email-error" className="text-xs sm:text-sm text-red-600 mt-2" role="alert">
                  {t("form.emailInvalid")}
                </p>
              )}
            </div>

            {/* Telegram */}
            <div>
              <label htmlFor="telegram" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
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
                className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base min-h-[44px] ${
                  showTelegramError ? "border-red-400" : "border-gray-200"
                }`}
                placeholder={t("form.telegramPlaceholder")}
              />
              {showTelegramError && (
                <p id="telegram-error" className="text-xs sm:text-sm text-red-600 mt-2" role="alert">
                  {t("form.telegramInvalid")}
                </p>
              )}
            </div>

            {/* City */}
            <div>
              <label htmlFor="city" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.city")} {t("form.required")}
              </label>
              <input
                type="text"
                id="city"
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                placeholder={t("form.cityPlaceholder")}
              />
            </div>

            {/* MVP Tester — hidden for founders (they get early access + testing by default) */}
            {!isFounder && (
              <div>
                <label htmlFor="mvpTester" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                  {t("form.mvpTester")} {t("form.required")}
                </label>
                <CustomSelect
                  value={formData.mvpTester}
                  onChange={(v) => setFormData((prev) => ({ ...prev, mvpTester: v }))}
                  placeholder={t("form.mvpTesterPlaceholder")}
                  options={[
                    { value: "yes", label: t("form.mvpTesterOptions.yes") },
                    { value: "no", label: t("form.mvpTesterOptions.no") },
                  ]}
                />
              </div>
            )}

            {/* Telegram channel access consent */}
            <label className="flex items-start gap-3 rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.tgChannelAccess}
                onChange={(e) => setFormData((prev) => ({ ...prev, tgChannelAccess: e.target.checked }))}
                className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-xs sm:text-sm text-dark leading-5">
                {t("form.tgChannelAccess")} {t("form.required")}
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || !canSubmitStep1}
              className={`w-full font-semibold px-6 py-3 sm:px-8 sm:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 text-sm sm:text-base min-h-[44px] ${
                formData.membershipType === "founders"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                  : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary-dark hover:to-primary text-white"
              }`}
            >
              {formData.membershipType === "founders" ? (
                <span className="flex items-center justify-center gap-2">
                  🏅 {t("form.submitFounders")}
                </span>
              ) : (
                t("form.submit")
              )}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
              {t("form.privacy")}
            </p>
          </form>
        </>
        ) : (
          // STEP 2: Optional detailed information
          <>
            <div className="mb-6 text-center">
              <div className="text-3xl sm:text-4xl mb-3">✨</div>
              <h3 className="text-lg sm:text-xl font-bold text-dark mb-2">{t("form.step2Title")}</h3>
              <p className="text-sm sm:text-base text-gray-600">{t("form.step2Subtitle")}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">{/* Gender */}
            <div>
              <label htmlFor="gender" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.gender")} {t("form.required")}
              </label>
              <CustomSelect
                value={formData.gender}
                onChange={(v) => setFormData((prev) => ({ ...prev, gender: v }))}
                placeholder={t("form.genderPlaceholder")}
                options={[
                  { value: "female", label: t("form.genderOptions.female") },
                  { value: "male", label: t("form.genderOptions.male") },
                  { value: "non-binary", label: t("form.genderOptions.nonBinary") },
                  { value: "prefer-not-to-say", label: t("form.genderOptions.preferNotToSay") },
                ]}
              />
            </div>

            {/* Age Range */}
            <div>
              <label htmlFor="ageRange" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.ageRange")} {t("form.required")}
              </label>
              <CustomSelect
                value={formData.ageRange}
                onChange={(v) => setFormData((prev) => ({ ...prev, ageRange: v }))}
                placeholder={t("form.ageRangePlaceholder")}
                options={[
                  { value: "18-24", label: t("form.ageRangeOptions.18-24") },
                  { value: "25-34", label: t("form.ageRangeOptions.25-34") },
                  { value: "35-44", label: t("form.ageRangeOptions.35-44") },
                  { value: "45+", label: t("form.ageRangeOptions.45+") },
                ]}
              />
            </div>

            {/* Wardrobe Size */}
            <div>
              <label htmlFor="wardrobeSize" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.wardrobeSize")} {t("form.required")}
              </label>
              <CustomSelect
                value={formData.wardrobeSize}
                onChange={(v) => setFormData((prev) => ({ ...prev, wardrobeSize: v }))}
                placeholder={t("form.wardrobeSizePlaceholder")}
                options={[
                  { value: "0-50", label: t("form.wardrobeSizeOptions.0-50") },
                  { value: "51-100", label: t("form.wardrobeSizeOptions.51-100") },
                  { value: "101-200", label: t("form.wardrobeSizeOptions.101-200") },
                  { value: "201-300", label: t("form.wardrobeSizeOptions.201-300") },
                  { value: "300+", label: t("form.wardrobeSizeOptions.300+") },
                ]}
              />
            </div>

            {/* Main Problem */}
            <div>
              <label htmlFor="mainProblem" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.mainProblem")} {t("form.required")}
              </label>
              <CustomSelect
                value={formData.mainProblem}
                onChange={(v) => setFormData((prev) => ({ ...prev, mainProblem: v }))}
                placeholder={t("form.mainProblemPlaceholder")}
                options={[
                  { value: "nothing-to-wear", label: t("form.mainProblemOptions.nothingToWear") },
                  { value: "unused-items", label: t("form.mainProblemOptions.unusedItems") },
                  { value: "no-combinations", label: t("form.mainProblemOptions.noCombinations") },
                  { value: "want-organize", label: t("form.mainProblemOptions.wantOrganize") },
                  { value: "other", label: t("form.mainProblemOptions.other") },
                ]}
              />
            </div>

            {/* Instagram (Optional) */}
            <div>
              <label htmlFor="instagram" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.instagram")} {t("form.required")}
              </label>
              <input
                type="text"
                id="instagram"
                name="instagram"
                required
                value={formData.instagram}
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                placeholder={t("form.instagramPlaceholder")}
              />
            </div>

            {/* TikTok (Optional) */}
            <div>
              <label htmlFor="tiktok" className="block text-xs sm:text-sm font-semibold text-dark mb-1 sm:mb-1.5">
                {t("form.tiktok")} <span className="text-gray-400">{t("form.socialMediaOptional")}</span>
              </label>
              <input
                type="text"
                id="tiktok"
                name="tiktok"
                value={formData.tiktok}
                onChange={handleChange}
                className="w-full px-3 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors text-sm sm:text-base min-h-[44px]"
                placeholder={t("form.tiktokPlaceholder")}
              />
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                disabled={isSubmitting || !canSubmitStep2}
                className={`flex-1 font-semibold px-4 py-3 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 text-sm sm:text-base min-h-[44px] ${
                  formData.membershipType === "founders"
                    ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
                    : "bg-gradient-to-r from-primary to-primary/90 hover:from-primary-dark hover:to-primary text-white"
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {t("form.submitting")}
                  </span>
                ) : formData.membershipType === "founders" ? (
                  <span className="flex items-center justify-center gap-2">
                    🏅 {t("form.completeSignupFounders")}
                  </span>
                ) : (
                  t("form.completeSignup")
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center mt-3 sm:mt-4">
              {t("form.step2Note")}
            </p>
          </form>
        </>
        )}
      </div>

        <div className="mt-6 sm:mt-8 text-center">
          <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-3 px-4">{t("benefitsList.title")}</p>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {[ 1, 2, 3].map((index) => (
              <span
                key={index}
                className="bg-white border border-gray-200 rounded-full px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm text-gray-700"
              >
                ✓ {t(`benefitsList.items.${index}`)}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Payment Modal (visual only) */}
      {showPayment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Blurred backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowPayment(false)}
          />

          {/* Modal */}
          <div className="relative w-full max-w-md bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              type="button"
              onClick={() => setShowPayment(false)}
              className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 mb-3 shadow-lg">
                <span className="text-3xl">🏅</span>
              </div>
              <h2 className="text-2xl font-bold text-dark mb-1">{t("payment.title")}</h2>
              <p className="text-sm text-gray-600">{t("payment.subtitle")}</p>
            </div>

            {/* Order summary */}
            <div className="bg-secondary rounded-xl p-4 mb-6 border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{t("payment.item")}</span>
                <span className="text-sm font-semibold text-dark">$5.00</span>
              </div>
              <div className="border-t border-gray-200 my-2" />
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-dark">{t("payment.total")}</span>
                <span className="text-base font-bold text-amber-600">$5.00</span>
              </div>
            </div>

            {/* Card details (visual only) */}
            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs font-semibold text-dark mb-1">{t("payment.cardName")}</label>
                <input
                  type="text"
                  placeholder={t("payment.cardNamePlaceholder")}
                  className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors text-sm min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark mb-1">{t("payment.cardNumber")}</label>
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors text-sm min-h-[44px]"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                    <span className="text-lg">💳</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">{t("payment.expiry")}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="MM/YY"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors text-sm min-h-[44px]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-dark mb-1">{t("payment.cvc")}</label>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="123"
                    className="w-full px-3 py-2.5 rounded-xl border-2 border-gray-200 focus:border-amber-500 focus:outline-none transition-colors text-sm min-h-[44px]"
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setShowPayment(false);
                setIsSubmitted(true);
              }}
              className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold px-6 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-[0.98] text-base min-h-[44px]"
            >
              {t("payment.payButton")}
            </button>

            <p className="text-xs text-gray-500 text-center mt-3 flex items-center justify-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              {t("payment.secureNote")}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
