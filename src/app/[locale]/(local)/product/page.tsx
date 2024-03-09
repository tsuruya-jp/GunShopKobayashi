"use client";

import { Checkbox, FormControlLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import ProductList from "@/features/product/component/Product";

const ProductPage = () => {
  const checkItem = [false, false, false, false, false, false];
  const searchParams = useSearchParams();
  const queryString = searchParams ? searchParams.get("condition") : "";
  if (queryString) {
    switch (Number(queryString)) {
      case 0:
        checkItem[0] = true;
        break;
      case 1:
        checkItem[1] = true;
        break;
    }
  }
  const t = useTranslations();
  const [checked, setChecked] = useState(checkItem);
  const [data, setData] = useState<ProductData[]>([]);

  const change = (index: number): any => {
    const newChecked = checked.map((v, i) => (i === index ? !v : v));
    setChecked(newChecked);
  };

  useEffect(() => {
    const fetcher = async () => {
      const dataRes = await fetch(
        `/api/product/list?${new URLSearchParams({ condition: `${checked}` })}`,
        {
          cache: "no-store",
        }
      );
      const data = await dataRes.json();
      setData(data);
    }
    fetcher()
  }, [])

  return (
    <main>
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>
          {t("Product.Headline")}
        </h1>
        <div className="md:flex flex-wrap">
          <div className="mb-8 md:mr-5">
            <div className="w-full lg:w-[220px] top-8 sticky text-center border-4 rounded-lg border-[#AAA]">
              <div className="py-5 border-b-2 border-[#AAA]">
                <p>カテゴリーから探す</p>
              </div>
              <div className="w-4/5 grid grid-cols-2 mx-auto mt-5 mb-3 [&_span]:text-xs">
                <FormControlLabel
                  control={<Checkbox checked={checked[0]} onClick={() => change(0)} />}
                  label="新銃"
                />
                <FormControlLabel
                  control={<Checkbox checked={checked[1]} onClick={() => change(1)} />}
                  label="中古銃"
                />
              </div>
              <div className="w-4/5 border border-[#AAA] mx-auto"></div>
              <div className="w-4/5 grid grid-cols-2 md:grid-cols-1 md:grid-rows-4 mx-auto mt-3 mb-5 [&_span]:text-xs">
                <FormControlLabel
                  control={<Checkbox checked={checked[2]} onClick={() => change(2)} />}
                  label="狩猟銃"
                />
                <FormControlLabel
                  control={<Checkbox checked={checked[3]} onClick={() => change(3)} />}
                  label="クレー射撃銃"
                />
                <FormControlLabel
                  control={<Checkbox checked={checked[4]} onClick={() => change(4)} />}
                  label="ライフル銃"
                />
                <FormControlLabel
                  control={<Checkbox checked={checked[5]} onClick={() => change(5)} />}
                  label="エアライフル"
                />
              </div>
            </div>
          </div>
          <ProductList products={data} />
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
