import { describe, it, expect } from 'vitest';
import {
  getLocaleFromPathname,
  createLocalizedPathname,
  removeLocaleFromPathname,
} from '@/lib/i18n/utils';

describe('i18n Utils', () => {
  describe('getLocaleFromPathname', () => {
    it('should extract locale from pathname with locale', () => {
      expect(getLocaleFromPathname('/en/dashboard')).toBe('en');
      expect(getLocaleFromPathname('/zh/profile')).toBe('zh');
      expect(getLocaleFromPathname('/ja/settings')).toBe('ja');
      expect(getLocaleFromPathname('/vi/help')).toBe('vi');
    });

    it('should return default locale for pathname without locale', () => {
      expect(getLocaleFromPathname('/dashboard')).toBe('en');
      expect(getLocaleFromPathname('/')).toBe('en');
    });

    it('should return default locale for invalid locale', () => {
      expect(getLocaleFromPathname('/fr/dashboard')).toBe('en');
      expect(getLocaleFromPathname('/invalid/settings')).toBe('en');
    });
  });

  describe('createLocalizedPathname', () => {
    it('should replace existing locale in pathname', () => {
      expect(createLocalizedPathname('/en/dashboard', 'zh')).toBe(
        '/zh/dashboard'
      );
      expect(createLocalizedPathname('/zh/profile', 'ja')).toBe('/ja/profile');
      expect(createLocalizedPathname('/ja/settings', 'vi')).toBe(
        '/vi/settings'
      );
    });

    it('should add locale to pathname without locale', () => {
      expect(createLocalizedPathname('/dashboard', 'zh')).toBe('/zh/dashboard');
      expect(createLocalizedPathname('/', 'ja')).toBe('/ja/');
    });

    it('should handle nested paths', () => {
      expect(createLocalizedPathname('/en/dashboard/profile', 'zh')).toBe(
        '/zh/dashboard/profile'
      );
      expect(createLocalizedPathname('/zh/settings/account', 'ja')).toBe(
        '/ja/settings/account'
      );
    });
  });

  describe('removeLocaleFromPathname', () => {
    it('should remove locale from pathname', () => {
      expect(removeLocaleFromPathname('/en/dashboard')).toBe('/dashboard');
      expect(removeLocaleFromPathname('/zh/profile')).toBe('/profile');
      expect(removeLocaleFromPathname('/ja/settings')).toBe('/settings');
      expect(removeLocaleFromPathname('/vi/help')).toBe('/help');
    });

    it('should return original pathname if no locale present', () => {
      expect(removeLocaleFromPathname('/dashboard')).toBe('/dashboard');
      expect(removeLocaleFromPathname('/')).toBe('/');
    });

    it('should handle nested paths', () => {
      expect(removeLocaleFromPathname('/en/dashboard/profile')).toBe(
        '/dashboard/profile'
      );
      expect(removeLocaleFromPathname('/zh/settings/account')).toBe(
        '/settings/account'
      );
    });

    it('should handle invalid locales', () => {
      expect(removeLocaleFromPathname('/fr/dashboard')).toBe('/fr/dashboard');
      expect(removeLocaleFromPathname('/invalid/settings')).toBe(
        '/invalid/settings'
      );
    });
  });
});
