import Meta from "@/components/layouts/meta/Meta";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import Image from "@/components/elements/image/Image";
import listProducts from "@/features/product/api/list";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Checkbox, FormControlLabel } from "@mui/material";

export const ProductList = ({ products }: { products: ProductData[] }) => {
  const productsList = products.map(v => {
    return (
      <div className="" key={v.id}>
        <div className="border border-[#AAA] mb-4">
          <Image src={`/${v.image}`} alt="" />
        </div>
        <div className="ml-2 mb-16">
          <p className="text-xl">{v.name}</p>
          <p className="text-3xl">{`¥${v.price}`}</p>
        </div>
      </div>
    )
  });
  return(
    <>{productsList}</>
  );
}

const ProductPage = ({data}: {data: ProductData[]}) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Meta pageTitle={t("Common.Title")} pageDesc="" pageType="website" pageIcon="" />
      <Header />
      <main>
        <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
          <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>
            {t("Product.Headline")}
          </h1>
          <div className="flex flex-wrap">
            <div className="mr-5">
              <div className="w-full lg:w-[220px] top-8 sticky text-center border-4 rounded-lg border-[#AAA]">
                <div className="py-5 border-b-2 border-[#AAA]">
                  <p>カテゴリーから探す</p>
                </div>
                <div className="w-4/5 grid grid-cols-2 mx-auto mt-5 mb-3 [&_span]:text-xs">
                  <FormControlLabel control={<Checkbox />} label="新銃" />
                  <FormControlLabel control={<Checkbox />} label="中古銃" />
                </div>
                <div className="w-4/5 border border-[#AAA] mx-auto"></div>
                <div className="w-4/5 mx-auto mt-3 mb-5 [&_span]:text-xs">
                  <div className="text-left">
                    <FormControlLabel control={<Checkbox />} label="狩猟中" />
                  </div>
                  <div className="text-left">
                  <FormControlLabel control={<Checkbox />} label="クレー射撃銃" />
                  </div>
                  <div className="text-left">
                  <FormControlLabel control={<Checkbox />} label="ライフル銃" />
                  </div>
                  <div className="text-left">
                  <FormControlLabel control={<Checkbox />} label="エアライフル" />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex-1">
              <ProductList products={data} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  const data = await listProducts();
  const product: ProductData[] = await JSON.parse(JSON.stringify(data));
  try {
    return {
      props: {
        data: product,
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
