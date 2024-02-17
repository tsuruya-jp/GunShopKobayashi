"use client";

import NewsDialog from "@/features/news/components/NewsDialog";
import { useEffect, useState } from "react";

const AdminNews = () => {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<NewsData[]>([]);
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
    return;
  }, []);
  const open = (i: number) => {
    setSelected(data[i]);
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
  return (
    <>
      <NewsDialog disabled={disabled} data={selected} close={close} />
      {data.map((v: NewsData, i: number) => (
        <div key={i.toString()}>
          <button onClick={() => open(i)} className="hover:text-gray-400">
            {v.title}
          </button>
        </div>
      ))}
    </>
  );
};

export default AdminNews;
