"use client";

import Loading from "@/components/elements/loading/Loading";
import News from "@/features/news/components/News";
import useSWR from "swr";

const Admin = () => {
  const fetcher = () =>
    fetch(`/api/news/list`, { cache: "no-store" }).then((res) => res.json());
  const { data, error } = useSWR("", fetcher);
  if (!data) return <Loading />;
  return <News data={data} />;
};

export default Admin;
