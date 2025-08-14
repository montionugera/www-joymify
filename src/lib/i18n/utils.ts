import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale, type Locale } from './config';

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  const validLocale =
    locale && locales.includes(locale as Locale) ? locale : defaultLocale;

  return {
    locale: validLocale,
    messages: (await import(`./locales/${validLocale}.json`)).default,
  };
});

export function getLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const locale = segments[1];
  return locales.includes(locale as Locale) ? locale : defaultLocale;
}

export function createLocalizedPathname(
  pathname: string,
  locale: string
): string {
  const segments = pathname.split('/');
  const currentLocale = segments[1];

  if (locales.includes(currentLocale as Locale)) {
    segments[1] = locale;
  } else {
    segments.splice(1, 0, locale);
  }

  return segments.join('/');
}

export function removeLocaleFromPathname(pathname: string): string {
  const segments = pathname.split('/');
  const locale = segments[1];

  if (locales.includes(locale as Locale)) {
    segments.splice(1, 1);
  }

  return segments.join('/');
}
