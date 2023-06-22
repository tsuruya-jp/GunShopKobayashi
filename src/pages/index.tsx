import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import MoreButton from "@/components/elements/morebutton/MoreButton";
import Image from "@/components/elements/image/Image";
import styles from "../styles/Top.module.scss";

type ProductCardProps = {
  assortment: string;
};

type NewsArticleProps = {
  date: string;
  description: string;
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

export const NewsArticle = ({
  date,
  description
}: NewsArticleProps) => {
  return (
    <div className={`mb-8 ${styles.parent} flex`}>
      <p className="mr-[60px]">{date}</p>
      <p>{description}</p>
    </div>
  );
};

const Index = () => {
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
          <div className="mx-[60px] mb-[60px]">
            <NewsArticle date="2023-06-21" description="年末年始の営業について" />
            <NewsArticle date="2023-06-21" description="年末年始の営業について" />
            <NewsArticle date="2023-06-21" description="年末年始の営業について" />
            <NewsArticle date="2023-06-21" description="年末年始の営業について" />
            <NewsArticle date="2023-06-21" description="年末年始の営業について" />
          </div>
          <MoreButton />
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
  return {
    props: { ...translations },
  };
};
