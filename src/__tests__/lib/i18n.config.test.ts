import { describe, it, expect } from 'vitest';
import {
  locales,
  defaultLocale,
  localeNames,
  localeFlags,
  type Locale,
} from '@/lib/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should have the correct supported locales', () => {
      expect(locales).toEqual(['en', 'zh', 'ja', 'vi']);
    });

    it('should have English as default locale', () => {
      expect(defaultLocale).toBe('en');
    });

    it('should have all locales as valid Locale type', () => {
      locales.forEach(locale => {
        expect(locale).toMatch(/^(en|zh|ja|vi)$/);
      });
    });
  });

  describe('localeNames', () => {
    it('should have names for all supported locales', () => {
      expect(localeNames.en).toBe('English');
      expect(localeNames.zh).toBe('中文');
      expect(localeNames.ja).toBe('日本語');
      expect(localeNames.vi).toBe('Tiếng Việt');
    });

    it('should have the same keys as locales array', () => {
      const localeKeys = Object.keys(localeNames);
      expect(localeKeys).toEqual(locales);
    });
  });

  describe('localeFlags', () => {
    it('should have flags for all supported locales', () => {
      expect(localeFlags.en).toBe('🇺🇸');
      expect(localeFlags.zh).toBe('🇨🇳');
      expect(localeFlags.ja).toBe('🇯🇵');
      expect(localeFlags.vi).toBe('🇻🇳');
    });

    it('should have the same keys as locales array', () => {
      const flagKeys = Object.keys(localeFlags);
      expect(flagKeys).toEqual(locales);
    });

    it('should have valid emoji flags', () => {
      Object.values(localeFlags).forEach(flag => {
        expect(flag).toMatch(/^🇺🇸|🇨🇳|🇯🇵|🇻🇳$/);
      });
    });
  });

  describe('Type safety', () => {
    it('should ensure Locale type is correct', () => {
      const validLocales: Locale[] = ['en', 'zh', 'ja', 'vi'];
      expect(validLocales).toEqual(locales);
    });
  });
});
