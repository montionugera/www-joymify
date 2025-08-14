'use client';

import { Button, Typography, Layout, Space, Card, Row, Col } from 'antd';
import {
  GoogleOutlined,
  RocketOutlined,
  SafetyOutlined,
  ThunderboltOutlined,
} from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { ThemeSwitcher } from '@/components/ui/ThemeSwitcher';
import type { Locale } from '@/lib/i18n/config';

const { Title, Paragraph } = Typography;
const { Header, Content, Footer } = Layout;

const Home = () => {
  const t = useTranslations();
  const params = useParams();
  const currentLocale = params.locale as Locale;

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth
    // console.log('Google login clicked');
  };

  const features = [
    {
      icon: (
        <ThunderboltOutlined style={{ fontSize: '2rem', color: '#1890ff' }} />
      ),
      title: t('home.features.feature1.title'),
      description: t('home.features.feature1.description'),
    },
    {
      icon: <SafetyOutlined style={{ fontSize: '2rem', color: '#52c41a' }} />,
      title: t('home.features.feature2.title'),
      description: t('home.features.feature2.description'),
    },
    {
      icon: <RocketOutlined style={{ fontSize: '2rem', color: '#faad14' }} />,
      title: t('home.features.feature3.title'),
      description: t('home.features.feature3.description'),
    },
  ];

  return (
    <Layout className='min-h-screen'>
      <Header className='bg-white shadow-sm flex items-center justify-between px-6'>
        <div className='flex items-center'>
          <Title level={3} className='!mb-0 !text-blue-600'>
            Joymify
          </Title>
        </div>
        <Space>
          <LanguageSwitcher currentLocale={currentLocale} />
          <ThemeSwitcher />
        </Space>
      </Header>

      <Content>
        {/* Hero Section */}
        <div className='bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20'>
          <div className='max-w-6xl mx-auto px-6 text-center'>
            <Title level={1} className='!text-white !mb-6'>
              {t('home.hero.title')}
            </Title>
            <Paragraph className='!text-white !text-xl !mb-8 max-w-3xl mx-auto'>
              {t('home.hero.subtitle')}
            </Paragraph>
            <Space size='large'>
              <Button
                type='primary'
                size='large'
                icon={<GoogleOutlined />}
                onClick={handleGoogleLogin}
                className='bg-white text-blue-600 border-white hover:bg-gray-100'
              >
                {t('auth.continueWithGoogle')}
              </Button>
              <Button
                size='large'
                className='text-white border-white hover:bg-white hover:text-blue-600'
              >
                {t('home.hero.learnMore')}
              </Button>
            </Space>
          </div>
        </div>

        {/* Features Section */}
        <div className='py-20 bg-gray-50'>
          <div className='max-w-6xl mx-auto px-6'>
            <div className='text-center mb-16'>
              <Title level={2} className='!mb-4'>
                {t('home.features.title')}
              </Title>
              <Paragraph className='!text-lg !text-gray-600'>
                {t('home.features.subtitle')}
              </Paragraph>
            </div>

            <Row gutter={[32, 32]}>
              {features.map((feature, index) => (
                <Col xs={24} md={8} key={index}>
                  <Card className='text-center h-full hover:shadow-lg transition-shadow'>
                    <div className='mb-4'>{feature.icon}</div>
                    <Title level={4} className='!mb-3'>
                      {feature.title}
                    </Title>
                    <Paragraph className='!text-gray-600'>
                      {feature.description}
                    </Paragraph>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        </div>

        {/* CTA Section */}
        <div className='py-20 bg-blue-600 text-white'>
          <div className='max-w-4xl mx-auto px-6 text-center'>
            <Title level={2} className='!text-white !mb-4'>
              {t('home.cta.title')}
            </Title>
            <Paragraph className='!text-white !text-lg !mb-8'>
              {t('home.cta.subtitle')}
            </Paragraph>
            <Button
              type='primary'
              size='large'
              icon={<GoogleOutlined />}
              onClick={handleGoogleLogin}
              className='bg-white text-blue-600 border-white hover:bg-gray-100'
            >
              {t('home.cta.button')}
            </Button>
          </div>
        </div>
      </Content>

      <Footer className='text-center bg-gray-800 text-white'>
        <Paragraph className='!text-white !mb-0'>
          © 2024 Joymify. {t('common.welcome')}
        </Paragraph>
      </Footer>
    </Layout>
  );
};

export default Home;
