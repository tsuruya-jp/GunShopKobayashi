import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import { Pagination } from '../../features/news/conponents/pagnation/Pagination';
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import listNews from "@/features/news/api/list";

const NewsList = () => {
  return(
    <>
      <Header />
      <Pagination maxPageNumber={5} currentPageNumber={4}/>
      <Footer />
    </>
  )
}

export default NewsList;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  const data = await listNews(5);
  const news = JSON.parse(JSON.stringify(data));
  return {
    props: {
      news: news,
      ...translations,
    },
  };
};
