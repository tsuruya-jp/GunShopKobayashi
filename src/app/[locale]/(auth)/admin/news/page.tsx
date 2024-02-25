"use client";

import NewsDialog from "@/features/news/components/NewsDialog";
import NewsList from "@/features/news/components/NewsList";
import { useEffect, useState } from "react";

const AdminNews = () => {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<NewsData[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [selected, setSelected] = useState<NewsData>({
    id: "",
    title: "",
    content: {},
    public: false,
  });

  useEffect(() => {
    const res = async () => {
      const res = await fetch("/api/news/list", { cache: "no-store" });
      const data = await res.json();
      setData(data.data);
    };
    res();
  }, [reloadCount]);

  const open = (i: number | null) => {
    if (typeof i === "number") {
      setSelected(data[i]);
    }
    setDisabled(true);
  };

  const close = () => {
    setSelected({
      id: "",
      title: "",
      content: {},
      public: false,
    });
    setDisabled(false);
  };

  const reload = () => {
    const count = reloadCount + 1;
    setReloadCount(count);
  };
  return (
    <>
      <NewsDialog disabled={disabled} data={selected} close={close} reload={reload} />
      <div className="mb-8">
        <button
          className="border border-black rounded bg-gray-700 text-white py-1 px-2"
          onClick={() => open(null)}
        >
          新規作成
        </button>
      </div>
      <NewsList items={data} open={open} />
    </>
  );
};

export default AdminNews;
