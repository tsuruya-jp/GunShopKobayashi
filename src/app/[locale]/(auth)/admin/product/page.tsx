"use client";

import ProductDialog from "@/features/product/component/ProductDialog";
import ProductList from "@/features/product/component/ProductList";
import { useEffect, useState } from "react";

const AdminProduct = () => {
  const [disabled, setDisabled] = useState(false);
  const [data, setData] = useState<ProductData[]>([]);
  const [reloadCount, setReloadCount] = useState(0);
  const [selected, setSelected] = useState<ProductData>({
    id: "",
    name: "",
    price: 0,
    image: "",
    images: "",
    type: 0,
    caliber: "",
    manufacturer: "",
    model: "",
    barrelLength: 0,
    weight: 0,
    pull: 0,
    condition: 0,
    remarks: "",
    sequence: 0,
    description: "",
  });

  useEffect(() => {
    const res = async () => {
      const res = await fetch("/api/product/list", { cache: "no-store" });
      const data = await res.json();
      setData(data);
    };
    res();
  }, [reloadCount]);

  const open = (i: number | null) => {
    if (typeof i === "number") {
      data[i].barrelLength = data[i].barrelLength ?? 0;
      data[i].weight = data[i].weight ?? 0;
      data[i].pull = data[i].pull ?? 0;
      data[i].sequence = data[i].pull ?? 0;
      setSelected(data[i]);
    }
    setDisabled(true);
  };

  const close = () => {
    setSelected({
      id: "",
      name: "",
      price: 0,
      image: "",
      images: "",
      type: 0,
      caliber: "",
      manufacturer: "",
      model: "",
      barrelLength: 0,
      weight: 0,
      pull: 0,
      condition: 0,
      remarks: "",
      sequence: 0,
      description: "",
    });
    setDisabled(false);
  };

  const reload = () => {
    const count = reloadCount + 1;
    setReloadCount(count);
  };

  return (
    <>
      <ProductDialog disabled={disabled} data={selected} close={close} reload={reload} />
      <div className="mb-8">
        <button
          className="border border-black rounded bg-gray-700 text-white py-1 px-2"
          onClick={() => open(null)}
        >
          新規作成
        </button>
      </div>
      <ProductList items={data} open={open} />
    </>
  );
};

export default AdminProduct;
