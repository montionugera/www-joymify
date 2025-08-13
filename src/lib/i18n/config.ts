export const locales = ['en', 'zh', 'ja', 'vi'] as const;
export const defaultLocale = 'en' as const;
export type Locale = typeof locales[number];

export const localeNames: Record<Locale, string> = {
  en: 'English',
  zh: '中文',
  ja: '日本語',
  vi: 'Tiếng Việt',
};

export const localeFlags: Record<Locale, string> = {
  en: '🇺🇸',
  zh: '🇨🇳',
  ja: '🇯🇵',
  vi: '🇻🇳',
};
