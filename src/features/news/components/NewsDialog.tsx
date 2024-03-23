import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, TextField } from "@mui/material";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DraftEditor = dynamic(() => import("@/features/editor/TextEditor"), { ssr: false });

const NewsDialog = ({
  disabled,
  data,
  close,
  reload,
}: {
  disabled: boolean;
  data: NewsData;
  close: () => void;
  reload: () => void;
}) => {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [isPublic, setPublic] = useState(data.public);
  const [button, setBtn] = useState(true);

  const newsTitle = () => {
    if (data.title.length === 0) {
      return <div className="text-2xl">登録</div>;
    }
    return <div className="text-2xl">編集</div>;
  };

  const deleteButton = () => {
    if (data.title.length !== 0) {
      return (
        <Button
          variant="outlined"
          className="rounded-md bg-slate-300 border-black/25 text-black py-1 px-4 ml-1 hover:border-black"
          onClick={() => deleteNews()}
        >
          削除
        </Button>
      );
    }
    return <></>;
  };

  const registerNews = async () => {
    if (data.id.length === 0) {
      await fetch("/api/news/create", {
        method: "POST",
        body: JSON.stringify({
          title: title,
          content: content,
          public: isPublic,
        }),
      });
      close();
      reload();
      return;
    }
    await fetch("/api/news/update", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
        title: title,
        content: content,
        public: isPublic,
      }),
    });
    close();
    reload();
    return;
  };

  const deleteNews = async () => {
    await fetch("/api/news/delete", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
      }),
    });
    close();
    reload();
    return;
  };

  useEffect(() => {
    if (title) {
      setBtn(false);
      return;
    }
    setBtn(true);
  }, [title]);


  useEffect(() => {
    setTitle(data.title);
    setContent(data.content);
    setPublic(data.public);
    return;
  }, [data]);

  return (
    <dialog open={disabled} className="top-0 left-0 z-[110] h-screen w-screen bg-black/40">
      <div className="h-full w-full flex items-center">
        <div className="w-2/3 h-[90%] m-auto overflow-scroll bg-white p-4">
          <div className="m-2 flex justify-between">
            {newsTitle()}
            <button onClick={close}>
              <Icon path={mdiCloseThick} size={1} />
            </button>
          </div>
          <div className="flex mt-4 mb-2 justify-end">
            <p className="mr-2">公開する</p>
            <input
              className="mr-2"
              type="checkbox"
              checked={isPublic}
              onChange={(e) => setPublic(!isPublic)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>タイトル</p>
            <TextField
              className="w-full rounded-md border-black"
              variant="outlined"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>お知らせ内容</p>
            <DraftEditor content={data.content} update={setContent} />
          </div>
          <div className="flex justify-center">
            <Button
              variant="outlined"
              className="rounded-md bg-slate-300 border-black/25 text-black py-1 px-4 hover:border-black"
              disabled={button}
              onClick={() => registerNews()}
            >
              登録
            </Button>
            {deleteButton()}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default NewsDialog;
