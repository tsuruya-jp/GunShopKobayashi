import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'next-i18next';
import Header from '@/components/layouts/header/Header';
import Footer from '@/components/layouts/footer/Footer';
import styles from '../styles/Top.module.scss';

const Index = () => {
  const { t } = useTranslation('common');
  return (
    <>
      <Header />
      <main className='w-[880px] mx-auto'>
        <div>
          <p>{t('Top.ProductList')}</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ['common']);
  return {
    props: { ...translations },
  };
};
