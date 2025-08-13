# 🌍 EPIC-004: Internationalization (i18n) Setup

## Epic Plan
Implement comprehensive internationalization support for English, Chinese, Japanese, and Vietnamese with proper routing and content management.

## 📋 Checklist

### 1. Setup Next.js i18n Configuration ⏳
- [ ] Configure next.config.js for i18n
- [ ] Setup locale detection middleware
- [ ] Create locale routing structure
- [ ] Configure default locale fallback
- [ ] Setup locale validation

### 2. Install & Configure i18n Dependencies ⏳
- [ ] Install next-intl library
- [ ] Configure next-intl provider
- [ ] Setup translation utilities
- [ ] Create i18n hooks
- [ ] Configure TypeScript for i18n

### 3. Create Translation Files ⏳
- [ ] Create English translations (en.json)
- [ ] Create Chinese translations (zh.json)
- [ ] Create Japanese translations (ja.json)
- [ ] Create Vietnamese translations (vi.json)
- [ ] Setup translation validation

### 4. Implement Language Switcher ⏳
- [ ] Create LanguageSwitcher component
- [ ] Implement locale switching logic
- [ ] Add language flags/icons
- [ ] Setup URL-based language switching
- [ ] Add language persistence

### 5. Setup Route Structure ⏳
- [ ] Create [locale] dynamic route
- [ ] Setup route groups for organization
- [ ] Implement locale-based navigation
- [ ] Create locale-aware links
- [ ] Setup 404 handling for invalid locales

## 🎯 Task Breakdown

### Phase 1: Configuration (Tasks 1-2)
```typescript
// next.config.js
const withNextIntl = require('next-intl/plugin')();

module.exports = withNextIntl({
  // Next.js config
});

// src/lib/i18n/config.ts
export const locales = ['en', 'zh', 'ja', 'vi'] as const;
export const defaultLocale = 'en' as const;
export type Locale = typeof locales[number];
```

### Phase 2: Translation Setup (Task 3)
```json
// src/lib/i18n/locales/en.json
{
  "common": {
    "welcome": "Welcome to Joymify",
    "login": "Login",
    "logout": "Logout"
  },
  "auth": {
    "continueWithGoogle": "Continue with Google",
    "signIn": "Sign In",
    "signUp": "Sign Up"
  },
  "home": {
    "hero": {
      "title": "Transform Your Experience",
      "subtitle": "Discover amazing features"
    }
  }
}
```

### Phase 3: Components (Task 4)
```typescript
// src/components/layout/LanguageSwitcher.tsx
export const LanguageSwitcher = () => {
  const { locale, pathname, push } = useRouter();
  const { t } = useTranslations('common');
  
  const handleLanguageChange = (newLocale: string) => {
    push(pathname, { locale: newLocale });
  };
  
  return (
    <Dropdown menu={{ items: languageOptions }}>
      <Button icon={<GlobalOutlined />}>
        {getLanguageName(locale)}
      </Button>
    </Dropdown>
  );
};
```

### Phase 4: Routing (Task 5)
```typescript
// src/app/[locale]/layout.tsx
export default function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

## 📁 Expected File Structure
```
src/
├── app/
│   ├── [locale]/
│   │   ├── (auth)/
│   │   ├── (dashboard)/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── layout.tsx
│   └── globals.css
├── lib/
│   └── i18n/
│       ├── locales/
│       │   ├── en.json
│       │   ├── zh.json
│       │   ├── ja.json
│       │   └── vi.json
│       ├── config.ts
│       └── utils.ts
├── components/
│   └── layout/
│       └── LanguageSwitcher.tsx
└── hooks/
    └── useTranslation.ts
```

## 🌍 Supported Languages
- **English (en)**: Default language
- **Chinese (zh)**: Simplified Chinese
- **Japanese (ja)**: Japanese
- **Vietnamese (vi)**: Vietnamese

## 🔧 Configuration Files
- **next.config.js**: i18n configuration
- **middleware.ts**: Locale detection and routing
- **src/lib/i18n/config.ts**: i18n constants and types
- **src/lib/i18n/utils.ts**: Translation utilities

## 📝 Translation Structure
```json
{
  "common": {
    "navigation": {},
    "buttons": {},
    "messages": {}
  },
  "auth": {
    "login": {},
    "register": {},
    "errors": {}
  },
  "home": {
    "hero": {},
    "features": {},
    "cta": {}
  },
  "dashboard": {
    "sidebar": {},
    "content": {}
  }
}
```

## �� Status: ⏳ Pending
