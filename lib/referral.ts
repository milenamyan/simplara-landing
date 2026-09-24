const REF_STORAGE_KEY = "simplara_ref";
const REF_VISIT_LOGGED_PREFIX = "simplara_ref_visit_logged:";

/** Allow influencer-style ids: letters, numbers, underscore, hyphen (e.g. dinul_hakobyann, _ella__99). */
export function sanitizeRef(raw: string | null | undefined): string {
  if (!raw) return "";
  const cleaned = raw.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return cleaned.slice(0, 64);
}

export function captureRefFromUrl(): string {
  if (typeof window === "undefined") return "";

  const params = new URLSearchParams(window.location.search);
  const fromUrl = sanitizeRef(params.get("ref"));

  if (fromUrl) {
    try {
      localStorage.setItem(REF_STORAGE_KEY, fromUrl);
    } catch {
      // Ignore storage failures (private mode, etc.)
    }
    return fromUrl;
  }

  return getStoredRef();
}

export function getStoredRef(): string {
  if (typeof window === "undefined") return "";
  try {
    return sanitizeRef(localStorage.getItem(REF_STORAGE_KEY));
  } catch {
    return "";
  }
}

export function hasLoggedReferralVisit(ref: string): boolean {
  if (typeof window === "undefined" || !ref) return true;
  try {
    return localStorage.getItem(`${REF_VISIT_LOGGED_PREFIX}${ref}`) === "1";
  } catch {
    return false;
  }
}

export function markReferralVisitLogged(ref: string): void {
  if (typeof window === "undefined" || !ref) return;
  try {
    localStorage.setItem(`${REF_VISIT_LOGGED_PREFIX}${ref}`, "1");
  } catch {
    // Ignore
  }
}
