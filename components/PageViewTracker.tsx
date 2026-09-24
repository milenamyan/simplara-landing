"use client";

import { captureRefFromUrl } from "@/lib/referral";
import { useEffect, useRef } from "react";

/**
 * Tracks EVERY page view with a ref parameter (no deduplication).
 * Sends to Google Sheets to increment total visit counter.
 */
export default function PageViewTracker() {
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const ref = captureRefFromUrl();
    if (!ref) return;

    const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_SCRIPT_URL;
    if (!scriptUrl) return;

    const body = new URLSearchParams({
      type: "page_view",
      ref,
      path: window.location.pathname,
    });

    void fetch(scriptUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
      keepalive: true,
    }).catch(() => {
      // Ignore errors for page view tracking
    });
  }, []);

  return null;
}
