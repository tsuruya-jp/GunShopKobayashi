import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import { Pagination } from "../../features/news/conponents/pagnation/Pagination";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { NewsArticle } from "@/features/news/conponents/pagnation/NewsArticle";
import { useEffect, useRef} from "react";

type Props = {
  data: NewsArticle;
  pagination: {
    count: number;
    currentPage: number;
  };
};

const NewsList = ({ data, pagination }: Props) => {
  const contentHeight = useRef<HTMLDivElement>(null);
  const setHeight = () =>{
    if(!contentHeight.current) return;
    contentHeight.current.style.height = "";
    const content = contentHeight.current.offsetHeight + 640;
    if(window.innerHeight > content){
      const height = window.innerHeight - 640;
      contentHeight.current.style.height = height.toString() + "px";
    }
  }
  
  useEffect(() => {
    setHeight();
  }, [data]);

  return (
    <>
      <Header />
      <div ref={contentHeight} className={`lg:w-[880px] mx-auto mt-[80px] mb-[120px]`}>
        <h1 className={`title font-bold mb-14`}>新着情報</h1>
        <NewsArticle data={data} />
        <Pagination pagination={pagination} />
      </div>
      <Footer />
    </>
  );
};

export default NewsList;

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  const queryString = query.page ?? "";
  const currentPage = () => {
    if(Number(queryString) <= 1){
      return 1;
    }
    return Number(queryString);
  }
  const offset = (currentPage() - 1) * 10;
  const params = {
    take: "10",
    skip: String(offset),
  };
  const query_params = new URLSearchParams(params);
  const res = await fetch(`http://127.0.0.1:3000/api/news/list?${query_params}`, {
    method: "GET",
  }).then((res) => res.json());
  const count = await fetch(`http://127.0.0.1:3000/api/news/count`, {
    method: "GET",
  }).then((res) => res.json());

  const news: NewsArticle = await JSON.parse(JSON.stringify(res));

  return {
    props: {
      data: news,
      pagination: {
        count: count.data,
        currentPage: currentPage(),
      },
      ...translations,
    },
  };
};
