'use client';

import { Button, Result } from 'antd';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

const NotFound = () => {
  const t = useTranslations();
  const router = useRouter();

  return (
    <Result
      status='404'
      title='404'
      subTitle={t('errors.notFound')}
      extra={
        <Button type='primary' onClick={() => router.push('/')}>
          {t('navigation.home')}
        </Button>
      }
    />
  );
};

export default NotFound;
