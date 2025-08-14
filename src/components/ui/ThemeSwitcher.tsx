'use client';

import React from 'react';
import { Button, Tooltip } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useTheme } from '@/providers/ThemeProvider';

interface ThemeSwitcherProps {
  size?: 'small' | 'middle' | 'large';
  showText?: boolean;
  className?: string;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  size = 'middle',
  showText = false,
  className,
}) => {
  const { currentTheme, toggleTheme } = useTheme();

  const isLight = currentTheme === 'light';
  const icon = isLight ? <MoonOutlined /> : <SunOutlined />;
  const tooltipText = isLight ? 'Switch to dark mode' : 'Switch to light mode';
  const buttonText = isLight ? 'Dark' : 'Light';

  return (
    <Tooltip title={tooltipText} placement='bottom'>
      <Button
        type='text'
        icon={icon}
        onClick={toggleTheme}
        size={size}
        className={className}
        aria-label={tooltipText}
      >
        {showText && buttonText}
      </Button>
    </Tooltip>
  );
};

export { ThemeSwitcher };
