import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/lib/i18n/utils.ts');

const nextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);
