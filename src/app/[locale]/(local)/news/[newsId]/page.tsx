"use client";

import Loading from "@/components/elements/loading/Loading";
import { GetWindowSize } from "@/lib/hook";
import { format } from "date-fns";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import useSWR from "swr";

const News = ({ params }: { params: { newsId: string } }) => {
  const fetcher = (url: string) => fetch(url, { next: { revalidate: 900 } }).then((res) => res.json());
  const { windowHeight, windowWidth } = GetWindowSize();
  const queryString = params.newsId ?? "";
  const { data } = useSWR(`/api/news/get?id=${queryString}`, fetcher);
  if (!data) return <Loading />;

  const date = format(new Date(data.updatedAt), "yyyy-MM-dd");
  const raw = data.content;
  const contentState = convertFromRaw(raw);
  const editorState = EditorState.createWithContent(contentState);
  let height = 0;
  if (windowWidth >= 768) {
    height = windowHeight - 640;
  } else {
    height = windowHeight - 448;
  }

  return (
    <div
      className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
      style={{ minHeight: height }}
    >
      <div className="text-xs">{date}</div>
      <h1 className={`title font-bold mb-4`}>{data.title}</h1>
      <Editor editorState={editorState} onChange={() => {}} readOnly={true} />
    </div>
  );
};

export default News;
