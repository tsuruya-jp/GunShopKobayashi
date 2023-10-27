import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { useTranslation } from "react-i18next";
import { GetServerSideProps } from "next";

const ProductPage = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <main>
        <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
          <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>
            {t("RealProperty.Headline")}
          </h1>
          <div className="">
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default ProductPage;
