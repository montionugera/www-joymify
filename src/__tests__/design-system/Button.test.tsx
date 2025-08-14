import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/design-system/components/Button';
import { ThemeProvider } from '@/providers/ThemeProvider';

const renderWithTheme = (component: React.ReactElement) => {
  return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('Design System Button', () => {
  it('renders button with default props', () => {
    renderWithTheme(<Button>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('ant-btn-primary');
  });

  it('renders button with different variants', () => {
    const { rerender } = renderWithTheme(
      <Button variant='primary'>Primary</Button>
    );
    let button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('variant-primary');

    rerender(
      <ThemeProvider>
        <Button variant='secondary'>Secondary</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('variant-secondary');

    rerender(
      <ThemeProvider>
        <Button variant='outline'>Outline</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('variant-outline');

    rerender(
      <ThemeProvider>
        <Button variant='ghost'>Ghost</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('variant-ghost');

    rerender(
      <ThemeProvider>
        <Button variant='danger'>Danger</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Danger' });
    expect(button).toHaveClass('variant-danger');
  });

  it('renders button with different sizes', () => {
    const { rerender } = renderWithTheme(<Button size='small'>Small</Button>);
    let button = screen.getByRole('button', { name: 'Small' });
    expect(button).toHaveClass('ant-btn-sm');

    rerender(
      <ThemeProvider>
        <Button size='large'>Large</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('ant-btn-lg');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    renderWithTheme(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByRole('button', { name: 'Click me' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders loading state', () => {
    renderWithTheme(<Button loading>Loading</Button>);

    const button = screen.getByRole('button', { name: 'loading Loading' });
    expect(button).toHaveClass('ant-btn-loading');
  });

  it('renders disabled state', () => {
    const handleClick = vi.fn();
    renderWithTheme(
      <Button disabled onClick={handleClick}>
        Disabled
      </Button>
    );

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('renders block button', () => {
    renderWithTheme(<Button block>Block Button</Button>);

    const button = screen.getByRole('button', { name: 'Block Button' });
    expect(button).toHaveClass('ant-btn-block');
  });

  it('renders button with icon', () => {
    renderWithTheme(
      <Button icon={<span data-testid='icon'>🚀</span>}>With Icon</Button>
    );

    const button = screen.getByRole('button', { name: '🚀 With Icon' });
    const icon = screen.getByTestId('icon');

    expect(button).toContainElement(icon);
  });

  it('applies custom className', () => {
    renderWithTheme(<Button className='custom-class'>Custom</Button>);

    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button).toHaveClass('custom-class');
  });

  it('maps variants to correct Ant Design button types', () => {
    const { rerender } = renderWithTheme(
      <Button variant='primary'>Primary</Button>
    );
    let button = screen.getByRole('button', { name: 'Primary' });
    expect(button).toHaveClass('ant-btn-primary');

    rerender(
      <ThemeProvider>
        <Button variant='outline'>Outline</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('ant-btn-default');

    rerender(
      <ThemeProvider>
        <Button variant='ghost'>Ghost</Button>
      </ThemeProvider>
    );
    button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('ant-btn-text');
  });

  it('applies danger prop for danger variant', () => {
    renderWithTheme(<Button variant='danger'>Danger</Button>);

    const button = screen.getByRole('button', { name: 'Danger' });
    expect(button).toHaveClass('ant-btn-dangerous');
  });

  it('forwards additional props', () => {
    renderWithTheme(
      <Button data-testid='custom-button' aria-label='Custom label'>
        Custom
      </Button>
    );

    const button = screen.getByTestId('custom-button');
    expect(button).toHaveAttribute('aria-label', 'Custom label');
  });
});
