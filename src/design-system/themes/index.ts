import type { ThemeConfig } from 'antd';
import { lightTheme } from './light';
import { darkTheme } from './dark';

export type ThemeMode = 'light' | 'dark';

export const themes: Record<ThemeMode, ThemeConfig> = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode: ThemeMode): ThemeConfig => {
  return themes[mode];
};

export { lightTheme, darkTheme };
