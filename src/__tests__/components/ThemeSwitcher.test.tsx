import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import { ThemeProvider } from '@/providers/ThemeProvider';

// Mock next/navigation
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
}));

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('ThemeSwitcher', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
  });
  it('renders theme switcher button', () => {
    renderWithTheme(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('shows moon icon when in light theme', () => {
    renderWithTheme(<ThemeSwitcher />);

    // Default theme is light, so should show moon icon
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('shows sun icon when in dark theme', () => {
    renderWithTheme(<ThemeSwitcher />);

    const button = screen.getByRole('button');

    // Click to switch to dark theme
    fireEvent.click(button);

    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('toggles theme when clicked', () => {
    renderWithTheme(<ThemeSwitcher />);

    const button = screen.getByRole('button');

    // Initial state (light theme)
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');

    // Click to switch to dark theme
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');

    // Click to switch back to light theme
    fireEvent.click(button);
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('renders with text when showText is true', () => {
    renderWithTheme(<ThemeSwitcher showText />);

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent('Dark'); // Default is light theme, so shows "Dark" button
  });

  it('renders without text when showText is false', () => {
    renderWithTheme(<ThemeSwitcher showText={false} />);

    const button = screen.getByRole('button');
    expect(button).not.toHaveTextContent('Dark');
    expect(button).not.toHaveTextContent('Light');
  });

  it('applies custom className', () => {
    renderWithTheme(<ThemeSwitcher className='custom-class' />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders with different sizes', () => {
    const { rerender } = renderWithTheme(<ThemeSwitcher size='small' />);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('ant-btn-sm');

    rerender(
      <ThemeProvider>
        <ThemeSwitcher size='large' />
      </ThemeProvider>
    );
    button = screen.getByRole('button');
    expect(button).toHaveClass('ant-btn-lg');
  });

  it('persists theme in localStorage', async () => {
    const { unmount } = renderWithTheme(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    fireEvent.click(button); // Switch to dark theme

    // Wait for the effect to run
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(localStorage.getItem('theme')).toBe('dark');

    unmount();

    // Re-render and check if theme persists
    renderWithTheme(<ThemeSwitcher />);
    const newButton = screen.getByRole('button');
    expect(newButton).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('loads theme from localStorage on mount', () => {
    // Set dark theme in localStorage
    localStorage.setItem('theme', 'dark');

    renderWithTheme(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('falls back to light theme for invalid localStorage value', () => {
    // Set invalid theme in localStorage
    localStorage.setItem('theme', 'invalid');

    renderWithTheme(<ThemeSwitcher />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Switch to dark mode');
  });
});
