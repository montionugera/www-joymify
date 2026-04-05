import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/utils.ts');

const nextConfig = {
  output: 'standalone',
};

export default withNextIntl(nextConfig);
