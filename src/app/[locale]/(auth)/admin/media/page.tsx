"use client";

import MediaDialog from "@/features/media/component/MediaDialog";
import MediaList from "@/features/media/component/MediaList";
import { useEffect, useState } from "react";

const AdminMedia = () => {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<MediaData[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [selected, setSelected] = useState<MediaData>({
    id: "",
    name: "",
    urn: "",
  });

  useEffect(() => {
    const res = async () => {
      const res = await fetch("/api/media/list", {
        method: "POST",
        body: JSON.stringify({}),
      });
      const data = await res.json();
      setData(data);
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
      name: "",
      urn: "",
    });
    setDisabled(false);
  };

  const reload = () => {
    const count = reloadCount + 1;
    setReloadCount(count);
  };

  return (
    <>
      <MediaDialog disabled={disabled} data={selected} close={close} reload={reload} />
      <div className="mb-8">
        <button
          className="border border-black rounded bg-gray-700 text-white py-1 px-2"
          onClick={() => open(null)}
        >
          新規作成
        </button>
      </div>
      <MediaList items={data} open={open} />
    </>
  );
};

export default AdminMedia;
