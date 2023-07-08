import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import MoreButton from "@/components/elements/morebutton/MoreButton";
import Image from "@/components/elements/image/Image";
import { NewsArticle } from "@/features/news/conponents/pagnation/NewsArticle";

type ProductCardProps = {
  assortment: string;
};

export const ProductCard = ({ assortment }: ProductCardProps) => {
  const { t } = useTranslation("common");
  return (
    <div className="w-[280px] h-[380px] pt-24 bg-gray-400 text-center">
      <div className="text-[28px]">{t(`Top.Product.${assortment}`)}</div>
      <div className="mb-32 text-xs">{t(`Top.Product.En${assortment}`)}</div>
      <MoreButton />
    </div>
  );
};

const Index = ({ data }: NewsArticleProps) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <div className="h-[580px] mb-20">
        <Image src="/main.png" alt="" />
      </div>
      <main className="w-[880px] mx-auto">
        <div className="mb-20">
          <p className="mb-5 text-[28px]">{t("Top.Headline.Product")}</p>
          <div className="w-fit mb-10 py-3 px-7 text-xs bg-gray-200">
            {t("Top.Product.ViewAllGuns")}
          </div>
          <div className="flex justify-between">
            <ProductCard assortment="NewGuns" />
            <ProductCard assortment="OldGuns" />
            <ProductCard assortment="OnlineStore" />
          </div>
        </div>
        <div className="mb-20">
          <p className="mb-20 text-[28px]">{t("Top.Headline.News")}</p>
          <NewsArticle data={data} />
          <MoreButton url="news" />
        </div>
        <div>
          <p className="mb-20 text-[28px]">{t("Top.Headline.CorporateName")}</p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Index;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);
  try {
    const params = {
      take: "5",
      skip: ""
    };
    const query_params = new URLSearchParams(params);
    const data = await fetch(`http://127.0.0.1:3000/api/news/list?${query_params}`, {
      method: "GET",
    }).then((data) => data.json());
    const news = await JSON.parse(JSON.stringify(data));
    return {
      props: {
        data: news,
        ...translations,
      },
    };
  } catch (e) {
    return {
      props: {
        data: [],
        ...translations,
      },
    };
  }
};
