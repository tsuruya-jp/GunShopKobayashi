import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import { format } from "date-fns";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useLayoutEffect, useRef, useState } from "react";

const News = ({ news }: any) => {
  const heightRef = useRef<HTMLDivElement>(null);
  const [height, update] = useState(Number())
  useLayoutEffect(() => {
    const h1 = window.innerHeight;
    const h2 = heightRef.current!.offsetHeight;
    if(h1 > h2){
      update(h1);
    }else if(h1 < h2){
      update(h2);
    }
  }, []);

  const raw = news.data.content;
  const contentState = convertFromRaw(raw);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
  const date = format(new Date(news.data.updatedAt), "yyyy-MM-dd");
  
  return (
    <div ref={heightRef}>
      <Header />
      <div className={`h-[calc(${height}px-640px)] w-[880px] mx-auto mt-[80px] mb-[120px]`}>
        <div className="text-xs">{date}</div>
        <h1 className={`title font-bold mb-4`}>{news.data.title}</h1>
        <Editor editorState={editorState} onChange={setEditorState} readOnly={true} />
      </div>
      <Footer />
    </div>
  );
};

export default News;

export const getStaticPaths: GetStaticPaths = async () => {
  const params = {
    take: "",
    skip: ""
  };
  const query_params = new URLSearchParams(params);
  const res = await fetch(`http://127.0.0.1:3000/api/news/list?${query_params}`, {
    method: "GET",
  }).then((res) => res.json());

  const data: NewsArticle = JSON.parse(JSON.stringify(res));
  const paths = data.data.map((v: NewsData) => {
    const date = format(new Date(v.createdAt), "yyyy-MM-dd");
    const permalink = String(date + "_" + v.title);
    return {
      params: {
        newsId: permalink,
      },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  if (!params) {
    return { props: {} };
  }

  const id = params.newsId as string;
  const query = {
    id: id,
  };
  const queryParams = new URLSearchParams(query);
  const res = await fetch(`http://127.0.0.1:3000/api/news/get?${queryParams}`, {
    method: "GET",
  }).then((res) => res.json());

  const news = await JSON.parse(JSON.stringify(res));

  return {
    props: {
      news: news,
      ...translations,
    },
  };
};
