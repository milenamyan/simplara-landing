"use client";

import {
  captureRefFromUrl,
  hasLoggedReferralVisit,
  markReferralVisitLogged,
} from "@/lib/referral";
import { track } from "@vercel/analytics";
import { useEffect } from "react";

/**
 * Captures ?ref= from the URL, stores it for waitlist attribution,
 * logs one visit per session to Google Sheets, and sends a Vercel custom event.
 */
export default function ReferralTracker() {
  useEffect(() => {
    const ref = captureRefFromUrl();
    if (!ref || hasLoggedReferralVisit(ref)) {
      return;
    }

    markReferralVisitLogged(ref);

    try {
      track("referral_visit", { ref });
    } catch {
      // Analytics must never break the page
    }

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
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
    }).catch(() => {
      // Ignore network / Sheets failures for click logging
    });
  }, []);

  return null;
}
