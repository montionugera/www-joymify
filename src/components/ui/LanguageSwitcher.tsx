'use client';

import { Button, Dropdown } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { localeNames, localeFlags, type Locale } from '@/lib/i18n/config';

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
}

const LanguageSwitcher = ({
  currentLocale,
  className,
}: LanguageSwitcherProps) => {
  const router = useRouter();

  const handleLanguageChange = (newLocale: Locale) => {
    const currentPath = window.location.pathname;
    const segments = currentPath.split('/');
    segments[1] = newLocale;
    router.push(segments.join('/'));
  };

  const languageOptions = Object.entries(localeNames).map(([locale, name]) => ({
    key: locale,
    label: (
      <span className='flex items-center gap-2'>
        <span>{localeFlags[locale as Locale]}</span>
        <span>{name}</span>
      </span>
    ),
    onClick: () => handleLanguageChange(locale as Locale),
  }));

  return (
    <Dropdown
      menu={{ items: languageOptions }}
      placement='bottomRight'
      trigger={['click']}
    >
      <Button
        type='text'
        icon={<GlobalOutlined />}
        className={className}
        data-testid='language-switcher'
      >
        {localeFlags[currentLocale]} {localeNames[currentLocale]}
      </Button>
    </Dropdown>
  );
};

export { LanguageSwitcher };
