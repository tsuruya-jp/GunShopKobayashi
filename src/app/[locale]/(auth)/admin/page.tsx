"use client"

import useSWR from "swr";

const News = ({ data }: NewsArticle) => {
  const posts = data.map((v) => {
    return (
      <div key={v.id}>
        <div>{v.title}</div>
      </div>
    )
  });

  return <div>{ posts }</div>;
}

const Admin = ({ news }: { news: NewsData[] }) => {
  const fetcher = (url: string) => fetch(`/api/news/list`, { cache: 'no-store' }).then(res => res.json());
  const { data, error } = useSWR("", fetcher);
  if (!data) return loading()
  return (
    <News data={ news } />
  );
};

const loading = () => {
  return(
    <div
      className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
      style={{ minHeight: "calc(100vh - 640px)" }}
    >
      now loading
    </div>
  )
}


export default Admin;
