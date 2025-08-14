# 🏠 EPIC-003: Home Page & Authentication

## Epic Plan

Build a beautiful home page with Google OAuth integration, responsive design, and proper user experience.

## 📋 Checklist

### 1. Setup Authentication Infrastructure 🚧

- [ ] Install Google OAuth dependencies
- [ ] Configure Google OAuth credentials
- [ ] Create authentication context/provider
- [ ] Setup authentication hooks
- [ ] Create authentication utilities
- [x] Setup i18n for auth messages

### 2. Design Home Page Layout ✅

- [x] Create responsive layout component
- [x] Design hero section
- [x] Add navigation header with language switcher
- [x] Create footer component
- [x] Implement mobile-first design
- [x] Setup locale-based routing

### 3. Implement Google Login 🚧

- [x] Create login button component
- [ ] Implement Google OAuth flow
- [ ] Handle authentication states
- [ ] Add loading states
- [ ] Implement error handling

### 4. Add Home Page Content ✅

- [x] Create compelling hero content (multilingual)
- [x] Add feature highlights (multilingual)
- [x] Include call-to-action sections (multilingual)
- [x] Add testimonials or social proof (multilingual)
- [x] Implement smooth animations
- [x] Setup translation files for all content

### 5. Testing & Optimization ⏳

- [ ] Write unit tests for components
- [ ] Test authentication flow
- [ ] Optimize performance
- [ ] Test responsive design
- [ ] Validate accessibility

## 🎯 Task Breakdown

### Phase 1: Auth Setup (Task 1)

```bash
# Install auth dependencies
npm install next-auth @auth/google-provider
npm install -D @types/next-auth
```

```typescript
// src/lib/auth.ts
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // ... config
};

// src/lib/i18n/config.ts
export const locales = ['en', 'zh', 'ja', 'vi'] as const;
export const defaultLocale = 'en' as const;
```

### Phase 2: Layout & Design (Task 2)

- Create responsive layout with Ant Design
- Implement mobile-first approach
- Add proper navigation structure with language switcher
- Create reusable layout components
- Setup locale-based routing with [locale] dynamic route

### Phase 3: Login Implementation (Task 3)

```typescript
// src/components/auth/GoogleLoginButton.tsx
export const GoogleLoginButton = () => {
  const { signIn, status } = useSession();
  const t = useTranslations('auth');

  return (
    <Button
      type="primary"
      size="large"
      icon={<GoogleOutlined />}
      onClick={() => signIn('google')}
      loading={status === 'loading'}
    >
      {t('continueWithGoogle')}
    </Button>
  );
};
```

### Phase 4: Content & Polish (Tasks 4-5)

- Add compelling multilingual content
- Implement smooth animations
- Test across devices and languages
- Optimize for performance
- Setup translation files for all supported languages

## 📁 Expected File Structure

```
src/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx (Home page)
│   │   ├── layout.tsx
│   │   └── not-found.tsx
│   ├── layout.tsx (Root)
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Layout.tsx
│   │   └── LanguageSwitcher.tsx
│   ├── auth/
│   │   ├── GoogleLoginButton.tsx
│   │   └── AuthProvider.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── Features.tsx
│       └── CTA.tsx
├── lib/
│   ├── i18n/
│   │   ├── locales/
│   │   │   ├── en.json
│   │   │   ├── zh.json
│   │   │   ├── ja.json
│   │   │   └── vi.json
│   │   └── config.ts
│   ├── auth.ts
│   └── auth-config.ts
└── hooks/
    ├── useAuth.ts
    └── useTranslation.ts
```

## 🎨 Design Requirements

- **Hero Section**: Eye-catching with clear value proposition (multilingual)
- **Login Button**: Prominent, accessible, with Google branding (multilingual)
- **Language Switcher**: Easy access to all supported languages
- **Responsive**: Mobile-first, tablet, desktop
- **Performance**: Fast loading, optimized images
- **Accessibility**: WCAG 2.1 AA compliance
- **RTL Support**: Consider right-to-left languages if needed

## 🔐 Authentication Flow

1. User clicks "Continue with Google"
2. Redirect to Google OAuth
3. User authorizes application
4. Redirect back with auth code
5. Exchange code for tokens
6. Create/update user session
7. Redirect to dashboard or welcome page

## �� Status: ⏳ Pending
