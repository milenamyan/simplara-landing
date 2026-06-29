// Form data types for the waitlist form
export interface WaitlistFormData {
  name: string;
  email: string;
  telegram: string;
  city: string;
  gender: "female" | "male" | "non-binary" | "prefer-not-to-say" | "";
  ageRange: "18-24" | "25-34" | "35-44" | "45+" | "";
  mvpTester: "yes" | "no" | "";
  wardrobeSize: "0-50" | "51-100" | "101-200" | "201-300" | "300+" | "";
  mainProblem: "nothing-to-wear" | "unused-items" | "no-combinations" | "want-organize" | "other" | "";
  instagram?: string;
  tiktok?: string;
}

// API response types
export interface ApiResponse {
  success: boolean;
  message?: string;
  error?: string;
}

// FAQ item type
export interface FAQItem {
  question: string;
  answer: string;
}

// Feature item type
export interface Feature {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}
