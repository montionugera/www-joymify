export const colors = {
  // Primary colors
  primary: {
    50: '#e6f7ff',
    100: '#bae7ff',
    200: '#91d5ff',
    300: '#69c0ff',
    400: '#40a9ff',
    500: '#1890ff', // Main primary color
    600: '#096dd9',
    700: '#0050b3',
    800: '#003a8c',
    900: '#002766',
  },

  // Secondary colors
  secondary: {
    50: '#f6ffed',
    100: '#d9f7be',
    200: '#b7eb8f',
    300: '#95de64',
    400: '#73d13d',
    500: '#52c41a', // Main secondary color
    600: '#389e0d',
    700: '#237804',
    800: '#135200',
    900: '#092b00',
  },

  // Neutral colors
  neutral: {
    50: '#fafafa',
    100: '#f5f5f5',
    200: '#f0f0f0',
    300: '#d9d9d9',
    400: '#bfbfbf',
    500: '#8c8c8c',
    600: '#595959',
    700: '#434343',
    800: '#262626',
    900: '#1f1f1f',
  },

  // Semantic colors
  success: {
    light: '#52c41a',
    main: '#52c41a',
    dark: '#389e0d',
  },

  warning: {
    light: '#faad14',
    main: '#faad14',
    dark: '#d48806',
  },

  error: {
    light: '#ff4d4f',
    main: '#ff4d4f',
    dark: '#cf1322',
  },

  info: {
    light: '#1890ff',
    main: '#1890ff',
    dark: '#096dd9',
  },

  // Background colors
  background: {
    light: '#ffffff',
    dark: '#141414',
  },

  // Surface colors
  surface: {
    light: '#fafafa',
    dark: '#1f1f1f',
  },

  // Text colors
  text: {
    primary: {
      light: '#262626',
      dark: '#ffffff',
    },
    secondary: {
      light: '#595959',
      dark: '#bfbfbf',
    },
    disabled: {
      light: '#bfbfbf',
      dark: '#595959',
    },
  },

  // Border colors
  border: {
    light: '#d9d9d9',
    dark: '#434343',
  },
} as const;

export type ColorToken = typeof colors;
