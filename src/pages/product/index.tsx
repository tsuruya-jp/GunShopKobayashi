import Meta from "@/components/layouts/meta/Meta";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import Image from "@/components/elements/image/Image";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { Checkbox, FormControlLabel } from "@mui/material";

const ProductList = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Meta pageTitle={t("Common.Title")} pageDesc="" pageType="website" pageIcon="" />
      <Header />
      <main>
        <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
          <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>
            {t("Privacy.Headline")}
          </h1>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-[220px] text-center border border-[#AAA]">
              <div className="py-5 px-9 border-b border-[#AAA]">
                <p>カテゴリーから探す</p>
              </div>
              <div className="w-4/5 grid grid-cols-2 mx-auto mt-5 mb-3 [&_span]:text-xs">
                <FormControlLabel control={<Checkbox />} label="新銃" />
                <FormControlLabel control={<Checkbox />} label="中古銃" />
              </div>
              <div className="w-4/5 border border-[#AAA] mx-auto"></div>
              <div className="w-4/5 grid grid-rows-4 mx-auto mt-3 mb-5 [&_span]:text-xs">
                <FormControlLabel control={<Checkbox />} label="狩猟中" />
                <FormControlLabel control={<Checkbox />} label="クレー射撃銃" />
                <FormControlLabel control={<Checkbox />} label="ライフル銃" />
                <FormControlLabel control={<Checkbox />} label="エアライフル" />
              </div>
            </div>
            <div className="w-full flex-1">
              <div className="">
                <div className="border-2 border-black mb-4">
                  <Image src="/main.png" alt="" />
                </div>
                <div className="ml-2 mb-16">
                  <p className="text-xl">{`商品名`}</p>
                  <p className="text-3xl">{`¥`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductList;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  try {
    return {
      props: {
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
