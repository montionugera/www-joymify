import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { ConfigProvider } from 'antd';
import { NextIntlClientProvider } from 'next-intl';
import { expect } from 'vitest';

// Import your messages
import enMessages from '@/lib/i18n/locales/en.json';

// Custom render function that includes providers
interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  locale?: string;
  messages?: Record<string, any>;
}

const AllTheProviders = ({
  children,
  locale = 'en',
  messages = enMessages,
}: {
  children: React.ReactNode;
  locale?: string;
  messages?: Record<string, any>;
}) => {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ConfigProvider>{children}</ConfigProvider>
    </NextIntlClientProvider>
  );
};

const customRender = (ui: ReactElement, options: CustomRenderOptions = {}) => {
  const { locale, messages, ...renderOptions } = options;

  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders locale={locale} messages={messages}>
        {children}
      </AllTheProviders>
    ),
    ...renderOptions,
  });
};

// Re-export everything
export * from '@testing-library/react';
export { customRender as render };

// Custom matchers for common assertions
export const expectElementToBeVisible = (element: Element) => {
  expect(element).toBeInTheDocument();
  expect(element).toBeVisible();
};

export const expectElementToHaveText = (element: Element, text: string) => {
  expect(element).toHaveTextContent(text);
};

export const expectElementToHaveClass = (
  element: Element,
  className: string
) => {
  expect(element).toHaveClass(className);
};
