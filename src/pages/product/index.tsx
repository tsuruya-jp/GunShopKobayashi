import Meta from "@/components/layouts/meta/Meta";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import Image from "@/components/elements/image/Image";
import listProducts from "@/features/product/api/list";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Checkbox, FormControlLabel } from "@mui/material";
import Link from "next/link";
import { useEffect, useState } from "react";

export const ProductList = ({ products }: { products: ProductData[] }) => {
  const productsList = products.map((v) => {
    return (
      <div className="" key={v.id}>
        <div className="border border-[#AAA] mb-4">
          <Link href={`product/${v.name}`}>
            <Image src={`/${v.image}`} alt="" />
          </Link>
        </div>
        <div className="ml-2 mb-16">
          <Link href={`product/${v.name}`}>
            <p className="text-xl">{v.name}</p>
          </Link>
          <Link href={`product/${v.name}`}>
            <div className="flex items-baseline">
              <p className="text-3xl mr-1">{`¥ ${Number(v.price).toLocaleString()}`}</p>
              <p className="text-xs">(税込)</p>
            </div>
          </Link>
        </div>
      </div>
    );
  });
  return <>{productsList}</>;
};

const ProductPage = ({ data, checkItem }: { data: ProductData[]; checkItem: boolean[] }) => {
  const { t } = useTranslation("common");
  const [checked, setChecked] = useState(checkItem);
  const [items, setItems] = useState(data);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch("/api/product/list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        cache: "no-cache",
        body: JSON.stringify({ condition: checked }),
      });
      const items = await data.json();
      setItems(items.data);
    };
    fetchData();
  }, [checked]);

  const change = (index: number): any => {
    const newChecked = checked.map((v, i) => (i === index ? !v : v));
    setChecked(newChecked);
  };

  return (
    <>
      <Meta pageTitle={t("Common.Title")} pageDesc="" pageType="website" pageIcon="" />
      <Header />
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
            <div className="w-full flex-1">
              <ProductList products={items} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ locale, query }) => {
  const checkItem = [false, false, false, false, false, false];
  const translations = await serverSideTranslations(locale!, ["common"]);
  const queryString = query.condition ?? undefined;
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
  const data = await listProducts(checkItem);
  const product: ProductData[] = await JSON.parse(JSON.stringify(data));
  try {
    return {
      props: {
        data: product,
        checkItem: checkItem,
        ...translations,
      },
    };
  } catch (e) {
    return {
      props: {
        ...translations,
      },
    };
  }
};
