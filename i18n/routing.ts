import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ru'],
  defaultLocale: 'en',
  // English at /, Russian at /ru
  localePrefix: 'as-needed',
});
