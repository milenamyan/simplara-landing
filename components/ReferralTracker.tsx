"use client";

import {
  captureRefFromUrl,
  hasLoggedReferralVisit,
  markReferralVisitLogged,
} from "@/lib/referral";
import { track } from "@vercel/analytics";
import { useEffect, useRef } from "react";

/**
 * Captures ?ref= from the URL, stores it for waitlist attribution,
 * logs one visit per session to Google Sheets, and sends a Vercel custom event.
 */
export default function ReferralTracker() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) {
      return;
    }

    const ref = captureRefFromUrl();
    if (!ref || hasLoggedReferralVisit(ref)) {
      return;
    }

    // Mark as logged immediately to prevent duplicate requests
    hasRun.current = true;
    markReferralVisitLogged(ref);

    try {
      track("referral_visit", { ref });
    } catch {
      // Analytics must never break the page
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.warn("[referral] NEXT_PUBLIC_GOOGLE_SCRIPT_URL is not set");
      return;
    }

    const body = new URLSearchParams({
      type: "referral_click",
      ref,
      path: window.location.pathname,
      pageReferrer: document.referrer || "",
      userAgent: navigator.userAgent || "",
    });

    void fetch(scriptUrl, {
      method: "POST",
      body,
      keepalive: true,
    })
      .then(async (response) => {
        const text = await response.text();
        let result: { success?: boolean; error?: string } = {};
        try {
          result = JSON.parse(text);
        } catch {
          if (!response.ok) {
            console.warn("[referral] click log failed:", response.status, text.slice(0, 200));
            return;
          }
        }

        if (result.success === false) {
          console.warn("[referral] click log rejected:", result.error);
          return;
        }

        console.log("[referral] click logged:", ref);
      })
      .catch((err) => {
        console.warn("[referral] click log network error:", err);
      });
  }, []);

  return null;
}
