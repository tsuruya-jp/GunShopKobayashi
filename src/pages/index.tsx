import { GetStaticProps } from "next";
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Header from "@/components/layouts/header/Header";

const Index = () => {
  return (
    <>
      <Header />
    </>
  );
}

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(
        locale!,
        ['common']
      ))
    }
  }
};
