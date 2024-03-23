import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import { Button, styled, TextField } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";

const URL = process.env.NEXT_PUBLIC_CLOUDFLARE_URL;

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const MediaDialog = ({
  disabled,
  data,
  close,
  reload,
}: {
  disabled: boolean;
  data: MediaData;
  close: () => void;
  reload: () => void;
}) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [button, setBtn] = useState(true);

  const productTitle = () => {
    if (data.id.length === 0) {
      return <div className="text-2xl">登録</div>;
    }
    return <div className="text-2xl">編集</div>;
  };

  const deleteButton = () => {
    if (data.id.length !== 0) {
      return (
        <Button
          variant="outlined"
          className="rounded-md bg-slate-300 border-black/25 text-black py-1 px-4 ml-1 hover:border-black"
          onClick={() => deleteMedia()}
        >
          削除
        </Button>
      );
    }
    return <></>;
  };

  const registerMedia = async () => {
    if (data.id.length === 0) {
      await fetch("/api/media/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          image: image,
        })
      })
      close();
      reload();
      return;
    }
    await fetch("/api/media/update", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
        name: name,
        image: image,
      })
    })
    close();
    reload();
  };

  const deleteMedia = async () => {
    await fetch("/api/media/delete", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
      }),
    });
    close();
    reload();
  };

  const generateImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target?.files && e.target.files[0]) {
      const target = e.target.files[0];
      var reader = new FileReader();
      reader.readAsDataURL(target);
      reader.onload = function () {
        if (reader.result) {
          setImage(String(reader.result));
        }
      };
      e.target.value = "";
    }
  };

  useEffect(() => {
    setName(data.name);
    // setUrn(URL + data.urn);
    setImage(data.urn);
  }, [data]);

  useEffect(() => {
    if (name) {
      setBtn(false);
      return;
    }
    setBtn(true);
  }, [name]);

  return (
    <dialog open={disabled} className="top-0 left-0 z-[110] h-screen w-screen bg-black/40">
      <div className="h-full w-full flex items-center">
        <div className="w-2/3 h-[90%] m-auto overflow-scroll bg-white p-4">
          <div className="m-2 flex justify-between">
            {productTitle()}
            <button onClick={close}>
              <Icon path={mdiCloseThick} size={1} />
            </button>
          </div>
          <div className="mt-4 mb-8">
            <p>名前</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-8">
            <Button component="label" role={undefined} variant="contained" tabIndex={-1}>
              ファイルを選択する
              <VisuallyHiddenInput onChange={(e) => generateImage(e)} type="file" />
            </Button>
          </div>
          <div className="mb-8">
            <img src={image} alt="" />
          </div>
          <div className="flex justify-center">
            <Button
              variant="outlined"
              className="rounded-md bg-slate-300 border-black/25 text-black py-1 px-4 hover:border-black"
              disabled={button}
              onClick={() => registerMedia()}
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

export default MediaDialog;
