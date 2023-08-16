import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import getNews from "@/features/news/api/get";
import listNews from "@/features/news/api/list";
import { GetWindowSize } from "@/lib/hook";
import { format } from "date-fns";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import { GetStaticPaths, GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";

const News = ({ news }: { news: NewsData }) => {
  const { windowHeight, windowWidth } = GetWindowSize();
  let height = 0;
  if (windowWidth >= 768) {
    height = windowHeight - 640;
  } else {
    height = windowHeight - 408;
  }

  const raw = news.content;
  const contentState = convertFromRaw(raw);
  const [editorState, setEditorState] = useState(() => EditorState.createWithContent(contentState));
  const date = format(new Date(news.updatedAt), "yyyy-MM-dd");

  return (
    <>
      <Header />
      <div
        className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
        style={{ minHeight: height }}
      >
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
  const data = await listNews(undefined, undefined);
  const news: NewsData[] = await JSON.parse(JSON.stringify(data));
  const paths = news.map((v: NewsData) => {
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
  const data = await getNews(id);

  const news: NewsData = await JSON.parse(JSON.stringify(data));

  return {
    props: {
      news: news,
      ...translations,
    },
  };
};
