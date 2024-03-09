import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";

const ProductDialog = ({
  disabled,
  data,
  close,
  reload,
}: {
  disabled: boolean;
  data: ProductData;
  close: () => void;
  reload: () => void;
}) => {
  const [imageList, setImageList] = useState<{ id: string; name: string }[]>([]);
  const [id, setId] = useState(data.id);
  const [caliber, setCaliber] = useState(data.caliber);
  const [manu, setManu] = useState(data.manufacturer);
  const [model, setModel] = useState(data.model);
  const [bLen, setBLen] = useState(data.barrelLength);
  const [weight, setWeight] = useState(data.weight);
  const [pull, setPull] = useState(data.pull);
  const [remarks, setRemarks] = useState(data.remarks);
  const [desc, setDesc] = useState(data.description);
  const [image, setImage] = useState(data.image);
  const [images, setImages] = useState(data.images);
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [seq, setSeq] = useState(data.sequence);
  const [type, setType] = useState(data.type);
  const [cond, setCond] = useState(data.condition);

  const productTitle = () => {
    if (data.id.length === 0) {
      return <div className="text-2xl">登録</div>;
    }
    return <div className="text-2xl">編集</div>;
  };

  const deleteButton = () => {
    if (data.id.length !== 0) {
      return (
        <button
          className="cursor-pointer rounded-md bg-slate-300 py-1 px-4 ml-1"
          onClick={() => deleteProduct()}
        >
          削除
        </button>
      );
    }
    return <></>;
  };

  const registerProduct = async () => {
    if (data.id.length === 0) {
      await fetch("/api/product/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
        }),
      });
      close();
      reload();
      return;
    }
    await fetch("/api/product/update", {
      method: "POST",
      body: JSON.stringify({
        id: data.id,
        name: name,
      }),
    });
    close();
    reload();
    return;
  };

  const deleteProduct = async () => {
    await fetch("/api/product/delete", {
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
    setId(data.id);
    setCaliber(data.caliber);
    setManu(data.manufacturer);
    setModel(data.model);
    setBLen(data.barrelLength);
    setWeight(data.weight);
    setPull(data.pull);
    setRemarks(data.remarks);
    setDesc(data.description);
    setImage(data.image);
    setImages(data.images);
    setName(data.name);
    setPrice(data.price);
    setSeq(data.sequence);
    setType(data.type);
    setCond(data.condition);
    return;
  }, [data]);

  useEffect(() => {
    const res = async () => {
      const res = await fetch("/api/image/list", {
        method: "POST",
        body: JSON.stringify({ name: "" }),
        cache: "no-store",
      });
      const data = await res.json();
      setImageList(data);
    };
    res();
  }, []);

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
          <div className="mt-4 mb-2">
            <p>名前</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>メイン画像</p>
            <select
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            >
              {imageList.map((v, i) => {
                return (
                  <option key={i} value={v.id}>
                    {v.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mt-4 mb-2">
            <p>サブ画像</p>
            <select
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            >
              {imageList.map((v, i) => {
                return (
                  <option key={i} value={v.id}>
                    {v.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="mt-4 mb-2">
            <p>メーカー</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="text"
              value={manu}
              onChange={(e) => setManu(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>銃種</p>
            <select
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              value={type}
              onChange={(e) => setType(Number(e.target.value))}
            >
              <option value={0}>狩猟銃</option>
              <option value={1}>クレー射撃銃</option>
              <option value={2}>ライフル銃</option>
              <option value={3}>エアライフル銃</option>
            </select>
          </div>
          <div className="mt-4 mb-2">
            <p>モデル</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>金額</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.valueAsNumber)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>口径</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="text"
              value={caliber}
              onChange={(e) => setCaliber(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>銃身長</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="number"
              value={bLen}
              onChange={(e) => setBLen(e.target.valueAsNumber)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>重量</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.valueAsNumber)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>プル</p>
            <input
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              type="number"
              value={pull}
              onChange={(e) => setPull(e.target.valueAsNumber)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>程度</p>
            <select
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              value={cond}
              onChange={(e) => setCond(Number(e.target.value))}
            >
              <option value={0}>新銃</option>
              <option value={1}>中古銃</option>
            </select>
          </div>
          <div className="mt-4 mb-2">
            <p>備考</p>
            <textarea
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              value={remarks}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>説明</p>
            <textarea
              className="w-full rounded-md bg-slate-300/25 border border-black p-2"
              value={desc}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="cursor-pointer rounded-md bg-slate-300 py-1 px-4"
              onClick={() => registerProduct()}
            >
              登録
            </button>
            {deleteButton()}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProductDialog;
