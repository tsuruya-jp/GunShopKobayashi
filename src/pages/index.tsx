import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import Button from "@/components/elements/button/Button";
import Image from "@/components/elements/image/Image";
import { NewsArticle } from "@/features/news/conponents/pagnation/NewsArticle";
import Map from "@/features/map/components/Map";
import RealProperty from "@/components/elements/realProperty/RealProperty";

type ProductCardProps = {
  assortment: string;
};

export const ProductCard = ({ assortment }: ProductCardProps) => {
  const { t } = useTranslation("common");
  return (
    <div className="md:w-[31.8%] h-[220px] md:h-[380px] lg:h-[520px] pt-12 md:pt-24 lg:pt-36 mb-6 md:mb-0 bg-gray-400 text-center">
      <div className="text-3xl">{t(`Top.Product.${assortment}`)}</div>
      <div className="mb-8 md:mb-32 text-xs">{t(`Top.Product.En${assortment}`)}</div>
      <Button />
    </div>
  );
};

const Index = ({ data }: NewsArticleProps) => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <main className="">
        <div className="mb-16 md:mb-32">
          <Image src="/main.png" alt=""/>
        </div>
        <div className="w-[90%] mb-44 md:mb-64 lg:mb-80 mx-auto">
          <p className="mb-5 text-3xl">{t("Top.Headline.Product")}</p>
          <div className="w-fit mb-10 py-3 px-7 text-xs bg-gray-200">
            {t("Top.Product.ViewAllGuns")}
          </div>
          <div className="md:flex justify-between">
            <ProductCard assortment="NewGuns" />
            <ProductCard assortment="OldGuns" />
            <ProductCard assortment="OnlineStore" />
          </div>
        </div>
        <div className="w-[90%] mb-44 md:mb-64 lg:mb-80 mx-auto">
          <p className="mb-10 md:mb-16 text-3xl">{t("Top.Headline.News")}</p>
          <NewsArticle data={data} />
          <Button url="news" />
        </div>
        <div className="image-component">
          <div className="flex-component ml-auto">
            <div className="description px-4 md:pl-0 md:pr-[46px] md:ml-5 lg:ml-8 mb-12">
              <p className="mb-10 text-3xl">{t("Top.Headline.CorporateName")}</p>
              <div className="md:pr-[46px] leading-loose whitespace-pre-wrap">
                {t("Top.CorporateName.Description")}
              </div>
            </div>
            <div className="flex-image">
              <Image src="/about.png" alt=""/>
            </div>
          </div>
        </div>
        <div className="image-component">
          <div className="flex-component flex-row-reverse mr-auto">
            <div className="description px-4 md:pr-0 md:pl-[46px] md:mr-5 lg:mr-8 mb-12">
              <p className="md:text-right headline-2">{t("Top.Headline.HetakusoClub")}</p>
              <div className="mb-4 md:mb-16 whitespace-pre-wrap">{t("Top.HetakusoClub.Description")}</div>
              <Button label={t("Top.HetakusoClub.Article")} />
            </div>
            <div className="flex-image">
              <Image src="/about.png" alt=""/>
            </div>
          </div>
        </div>
        <div className="image-component">
          <div className="flex-component ml-auto">
            <div className="description px-4 ml-0 md:pr-[46px] md:ml-5 lg:ml-8 mb-12">
              <p className="headline-2">{t("Top.Headline.Annex")}</p>
              <div className="mb-4 md:mb-16 whitespace-pre-wrap">{t("Top.Annex.Description")}</div>
              <Button label={t("Top.Annex.Article")} />
            </div>
            <div className="flex-image">
              <Image src="/about.png" alt=""/>
            </div>
          </div>
        </div>
        <RealProperty />
        <div className="mb-16">
          <p className="w-[90%] mx-auto mb-10 text-3xl">{t("Top.Headline.StoreLocations")}</p>
          <div className="flex-component">
            <div className="flex-image h-[300px] lg:h-[450px]">
              <Map />
            </div>
            <div className="flex-1 w-[95%] md:pl-5 pt-8 md:pt-0 mx-auto">
              <div className="mb-8 text-xl font-bold parent">{t("Top.StoreLocations.CorporateName")}</div>
              <div className="mb-8 parent">
                <p>{t("Top.StoreLocations.PostalCode")}</p>
                <p>{t("Top.StoreLocations.Address")}</p>
              </div>
              <div className="mb-8 parent">
                <div className="flex mb-3">
                  <p className="w-[86px] text-center bg-gray-300 py-1 mr-3">{t("Top.StoreLocations.BusinessHours")}</p>
                  <p className="py-1">{t("Top.StoreLocations.Hours")}</p>
                </div>
                <div className="flex">
                  <p className="w-[86px] text-center bg-gray-300 py-1 mr-3">{t("Top.StoreLocations.RegureClosingDay")}</p>
                  <p className="py-1">{t("Top.StoreLocations.Days")}</p>
                </div>
              </div>
              <p className="mb-1">{t("Top.StoreLocations.ByCar")}</p>
              <p className="mb-3">{t("Top.StoreLocations.CarInformation")}</p>
              <p className="mb-1">{t("Top.StoreLocations.ByTrain")}</p>
              <p>{t("Top.StoreLocations.TrainInformation")}</p>
            </div>
          </div>
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
      skip: "",
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
