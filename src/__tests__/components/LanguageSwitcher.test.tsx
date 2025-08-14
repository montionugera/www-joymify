import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@/test/utils';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';

// Mock next/navigation
const mockPush = vi.fn();
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock window.location
Object.defineProperty(window, 'location', {
  value: {
    pathname: '/en/dashboard',
  },
  writable: true,
});

describe('LanguageSwitcher', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    window.location.pathname = '/en/dashboard';
  });

  describe('Rendering', () => {
    it('should render the language switcher button', () => {
      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      expect(button).toBeInTheDocument();
    });

    it('should display current locale with flag and name', () => {
      render(<LanguageSwitcher currentLocale='zh' />);

      const button = screen.getByTestId('language-switcher');
      expect(button).toHaveTextContent('🇨🇳 中文');
    });

    it('should display all supported locales correctly', () => {
      const locales = ['en', 'zh', 'ja', 'vi'] as const;

      locales.forEach(locale => {
        const { unmount } = render(<LanguageSwitcher currentLocale={locale} />);
        const button = screen.getByTestId('language-switcher');

        if (locale === 'en') expect(button).toHaveTextContent('🇺🇸 English');
        if (locale === 'zh') expect(button).toHaveTextContent('🇨🇳 中文');
        if (locale === 'ja') expect(button).toHaveTextContent('🇯🇵 日本語');
        if (locale === 'vi') expect(button).toHaveTextContent('🇻🇳 Tiếng Việt');

        unmount();
      });
    });

    it('should apply custom className', () => {
      render(<LanguageSwitcher currentLocale='en' className='custom-class' />);

      const button = screen.getByTestId('language-switcher');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Interaction', () => {
    it('should open dropdown when clicked', async () => {
      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      fireEvent.click(button);

      // Wait for dropdown to appear
      await waitFor(() => {
        expect(screen.getByText('🇨🇳')).toBeInTheDocument();
        expect(screen.getByText('🇯🇵')).toBeInTheDocument();
        expect(screen.getByText('🇻🇳')).toBeInTheDocument();
      });
    });

    it('should call router.push with correct path when language is changed', async () => {
      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      fireEvent.click(button);

      // Click on Chinese option
      await waitFor(() => {
        const chineseOption = screen.getByText('🇨🇳');
        fireEvent.click(chineseOption);
      });

      expect(mockPush).toHaveBeenCalledWith('/zh/dashboard');
    });

    it('should handle language change from different current locale', async () => {
      window.location.pathname = '/zh/profile';

      render(<LanguageSwitcher currentLocale='zh' />);

      const button = screen.getByTestId('language-switcher');
      fireEvent.click(button);

      // Click on Japanese option
      await waitFor(() => {
        const japaneseOption = screen.getByText('🇯🇵');
        fireEvent.click(japaneseOption);
      });

      expect(mockPush).toHaveBeenCalledWith('/ja/profile');
    });

    it('should handle nested paths correctly', async () => {
      window.location.pathname = '/en/dashboard/settings';

      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      fireEvent.click(button);

      // Click on Vietnamese option
      await waitFor(() => {
        const vietnameseOption = screen.getByText('🇻🇳');
        fireEvent.click(vietnameseOption);
      });

      expect(mockPush).toHaveBeenCalledWith('/vi/dashboard/settings');
    });
  });

  describe('Accessibility', () => {
    it('should have proper button type', () => {
      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      expect(button).toHaveAttribute('type', 'button');
    });

    it('should be clickable', () => {
      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      expect(button).toBeEnabled();
    });
  });

  describe('Edge Cases', () => {
    it('should handle root path correctly', async () => {
      window.location.pathname = '/';

      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      fireEvent.click(button);

      await waitFor(() => {
        const chineseOption = screen.getByText('🇨🇳');
        fireEvent.click(chineseOption);
      });

      expect(mockPush).toHaveBeenCalledWith('/zh');
    });

    it('should handle path without locale prefix', async () => {
      window.location.pathname = '/dashboard';

      render(<LanguageSwitcher currentLocale='en' />);

      const button = screen.getByTestId('language-switcher');
      fireEvent.click(button);

      await waitFor(() => {
        const japaneseOption = screen.getByText('🇯🇵');
        fireEvent.click(japaneseOption);
      });

      expect(mockPush).toHaveBeenCalledWith('/ja');
    });
  });
});
