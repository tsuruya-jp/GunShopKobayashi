import { mdiCloseThick } from "@mdi/js";
import Icon from "@mdi/react";
import {
  Button,
  Checkbox,
  InputAdornment,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { ReactNode, useEffect, useState } from "react";

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
  const [caliber, setCaliber] = useState(data.caliber);
  const [manu, setManu] = useState(data.manufacturer);
  const [model, setModel] = useState(data.model);
  const [bLen, setBLen] = useState(data.barrelLength);
  const [weight, setWeight] = useState(data.weight);
  const [pull, setPull] = useState(data.pull);
  const [remarks, setRemarks] = useState(data.remarks);
  const [desc, setDesc] = useState(data.description);
  const [image, setImage] = useState(data.image);
  const [images, setImages] = useState<any>(Object.values(data.images));
  const [name, setName] = useState(data.name);
  const [price, setPrice] = useState(data.price);
  const [type, setType] = useState(data.type);
  const [cond, setCond] = useState(data.condition);
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
          onClick={() => deleteProduct()}
        >
          削除
        </Button>
      );
    }
    return <></>;
  };

  const registerProduct = async () => {
    let obj;
    if (images.length !== 0) {
      obj = Object.assign({}, images);
    } else {
      obj = {};
    }
    if (data.id.length === 0) {
      await fetch("/api/product/create", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          caliber: caliber,
          manufacturer: manu,
          model: model,
          barrelLength: bLen,
          weight: weight,
          pull: pull,
          remarks: remarks,
          description: desc,
          image: image,
          images: obj,
          price: price,
          type: type,
          condition: cond,
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
        caliber: caliber,
        manufacturer: manu,
        model: model,
        barrelLength: bLen,
        weight: weight,
        pull: pull,
        remarks: remarks,
        description: desc,
        image: image,
        images: obj,
        price: price,
        type: type,
        condition: cond,
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

  const handleChangeImages = (event: SelectChangeEvent) => {
    const {
      target: { value },
    } = event;
    setImages(typeof value === "string" ? value.split(",") : value);
  };

  const renderVal = (items: any): ReactNode => {
    const name = items.map((v: string) => {
      return imageList.find(({ id }) => id === v)?.name;
    });
    return name.join(", ");
  };

  useEffect(() => {
    if (name) {
      setBtn(false);
      return;
    }
    setBtn(true);
  }, [name]);

  useEffect(() => {
    setCaliber(data.caliber);
    setManu(data.manufacturer);
    setModel(data.model);
    setBLen(data.barrelLength);
    setWeight(data.weight);
    setPull(data.pull);
    setRemarks(data.remarks);
    setDesc(data.description);
    setImages(Object.values(data.images));
    setName(data.name);
    setPrice(data.price);
    setType(data.type);
    setCond(data.condition);
    if (data.image) {
      setImage(data.image);
    } else if (imageList.length !== 0) {
      setImage(imageList[0].id);
    }
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
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>メイン画像</p>
            <Select
              className="w-full rounded-md bg-slate-300/25"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            >
              {imageList.map((v, i) => (
                <MenuItem key={i} value={v.id}>
                  {v.name}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="mt-4 mb-2">
            <p>サブ画像</p>
            <Select
              className="w-full rounded-md bg-slate-300/25"
              multiple
              value={images}
              onChange={handleChangeImages}
              renderValue={(selected) => renderVal(selected)}
            >
              {imageList.map((v, i) => (
                <MenuItem key={i} value={v.id}>
                  <Checkbox checked={images.indexOf(v.id) > -1} />
                  <ListItemText primary={v.name} />
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="mt-4 mb-2">
            <p>メーカー</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="text"
              value={manu}
              onChange={(e) => setManu(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>銃種</p>
            <Select
              className="w-full rounded-md bg-slate-300/25"
              value={type}
              onChange={(e) => setType(Number(e.target.value))}
            >
              <MenuItem value={0}>狩猟銃</MenuItem>
              <MenuItem value={1}>クレー射撃銃</MenuItem>
              <MenuItem value={2}>ライフル銃</MenuItem>
              <MenuItem value={3}>エアライフル銃</MenuItem>
            </Select>
          </div>
          <div className="mt-4 mb-2">
            <p>モデル</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>金額</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">円</InputAdornment>,
              }}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>口径</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="text"
              value={caliber}
              onChange={(e) => setCaliber(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>銃身長</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="number"
              value={bLen}
              onChange={(e) => setBLen(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">{'" (in)'}</InputAdornment>,
              }}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>重量</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="number"
              value={weight}
              onChange={(e) => setWeight(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">kg</InputAdornment>,
              }}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>プル</p>
            <TextField
              className="w-full rounded-md bg-slate-300/25"
              type="number"
              value={pull}
              onChange={(e) => setPull(Number(e.target.value))}
              InputProps={{
                endAdornment: <InputAdornment position="end">mm</InputAdornment>,
              }}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>程度</p>
            <Select
              className="w-full rounded-md bg-slate-300/25"
              value={cond}
              onChange={(e) => setCond(Number(e.target.value))}
            >
              <MenuItem value={0}>新銃</MenuItem>
              <MenuItem value={1}>中古銃</MenuItem>
            </Select>
          </div>
          <div className="mt-4 mb-2">
            <p>備考</p>
            <TextField
              multiline
              rows={4}
              className="w-full rounded-md bg-slate-300/25"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>
          <div className="mt-4 mb-2">
            <p>説明</p>
            <TextField
              multiline
              rows={4}
              className="w-full rounded-md bg-slate-300/25"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <Button
              variant="outlined"
              className="rounded-md bg-slate-300 border-black/25 text-black py-1 px-4 hover:border-black"
              disabled={button}
              onClick={() => registerProduct()}
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

export default ProductDialog;
