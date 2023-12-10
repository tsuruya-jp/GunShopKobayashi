"use client";

import News from "@/features/news/components/News";
import useSWR from "swr";

const Admin = () => {
  const fetcher = () =>
    fetch(`/api/news/list`, { cache: "no-store" }).then((res) => res.json());
  const { data, error } = useSWR("", fetcher);
  if (!data) return loading();
  return <News data={data} />;
};

const loading = () => {
  return (
    <div
      className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
      style={{ minHeight: "calc(100vh - 640px)" }}
    >
      now loading
    </div>
  );
};

export default Admin;
