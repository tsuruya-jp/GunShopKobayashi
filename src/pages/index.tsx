import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

const Index = () => {
  return (
    <>
      <Header />
      <Footer />
    </>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ['common']);
  return {
    props: {...translations}
  }
};
