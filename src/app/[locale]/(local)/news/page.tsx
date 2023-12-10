"use client";

import { Pagination } from "@/features/news/components/Pagination";
import { NewsArticle } from "@/features/news/components/NewsArticle";
import { GetWindowSize } from "@/lib/hook";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import useSWR from "swr";
import Loading from "@/components/elements/loading/Loading";

const NewsList = () => {
  const fetcher = (url: string) => fetch(url, { cache: "no-store" }).then((res) => res.json());
  const { windowHeight, windowWidth } = GetWindowSize();
  let height = 0;
  if (windowWidth >= 768) {
    height = windowHeight - 640;
  } else {
    height = windowHeight - 448;
  }
  const t = useTranslations();
  const searchParams = useSearchParams();
  const queryString = searchParams ? searchParams.get("page") : "";
  const { data, error } = useSWR(`/api/news/list?page=${queryString}`, fetcher);
  if (!data) return <Loading />

  return (
    <div
      className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
      style={{ minHeight: height }}
    >
      <h1 className={`title font-bold mb-14`} suppressHydrationWarning={true}>
        {t("News.Headline")}
      </h1>
      <div className="w-[90%] mx-auto">
        <NewsArticle data={data.data} />
      </div>
      <Pagination pagination={data.pagination} />
    </div>
  );
};

export default NewsList;
