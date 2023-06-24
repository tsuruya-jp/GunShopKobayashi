import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import getNews from "@/features/news/api/get";
import listNews from "@/features/news/api/list";
import { format } from "date-fns";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useEffect, useState } from "react";

const News = ({ news }: any) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  useEffect(() => {
    const raw = news.content;
    const contentState = convertFromRaw(raw);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState(newEditorState);
  }, []);
  const date = format(new Date(news.updatedAt), "yyyy-MM-dd");
  return (
    <>
      <Header />
      <div className="h-[calc(100vh-640px)] w-[880px] mx-auto mt-[80px] mb-[120px]">
        <div className="text-xs">{date}</div>
        <h1 className={`title font-bold mb-4`}>{news.title}</h1>
        <Editor editorState={editorState} onChange={setEditorState} readOnly={true} />
      </div>
      <Footer />
    </>
  );
};

export default News;

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await listNews();
  const data: NewsData[] = JSON.parse(JSON.stringify(res));
  const paths = data.map((v: NewsData) => {
    return {
      params: { newsId: v.id },
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
  const res = await getNews(id);
  const news = JSON.parse(JSON.stringify(res));

  return {
    props: {
      news,
      ...translations,
    },
  };
};
