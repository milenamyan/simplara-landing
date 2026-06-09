// Utility functions for form validation and data handling

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateTelegram = (telegram: string): boolean => {
  return telegram.startsWith('@') && telegram.length > 1;
};

export const validateContact = (contact: string): boolean => {
  return validateEmail(contact) || validateTelegram(contact);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Scroll to element with smooth behavior
export const scrollToElement = (elementId: string): void => {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// Track analytics event (placeholder for actual analytics implementation)
export const trackEvent = (eventName: string, properties?: Record<string, any>): void => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, properties);
  }
  console.log('Analytics Event:', eventName, properties);
};

// Format form data for submission
export const formatFormData = (data: Record<string, any>): Record<string, any> => {
  return {
    ...data,
    submittedAt: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
    referrer: typeof window !== 'undefined' ? document.referrer : '',
  };
};
