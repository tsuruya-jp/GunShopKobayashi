import Button from "@/components/elements/button/Button";
import Image from "@/components/elements/image/Image";
import Map from "@/features/map/components/Map";
import Slider from "@/features/slider/components/Slider";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { NewsArticle } from "@/features/news/components/NewsArticle";

type ProductCardProps = {
  assortment: string;
  url: string;
};

export const ProductCard = ({ assortment, url }: ProductCardProps) => {
  const t = useTranslations("Top");
  return (
    <div className="md:w-[31.8%] h-[220px] md:h-[380px] lg:h-[480px] rounded-md pt-12 md:pt-24 lg:pt-36 mb-6 md:mb-0 bg-gradient-to-br from-gray-100  to-gray-700 shadow-lg text-center">
      <div className="text-3xl font-extrabold">{t(`Product.${assortment}`)}</div>
      <div className="mb-8 md:mb-32 text-xs">{t(`Product.En${assortment}`)}</div>
      <Button url={url} />
    </div>
  );
};

const Index = () => {
  const t = useTranslations("Top");
  const items: SlideItem[] = [
    { id: 1, content: "/main1.png" },
    { id: 2, content: "/main2.png" },
    { id: 3, content: "/main3.png" },
    { id: 4, content: "/main4.png" },
  ];
  return (
    <main className="">
      <div className="mb-16 md:mb-32 lg:mb-80">
        <Slider items={items} top={true} />
      </div>
      <div className="w-[90%] mb-32 md:mb-44 lg:mb-64 mx-auto">
        <p className="mb-5 text-3xl">{t("Headline.Product")}</p>
        <Link href={"/product/"}>
          <div className="w-fit mb-10 py-3 px-7 rounded bg-[#3F5D75] text-[#DFB94A]">
            {t("Product.ViewAllGuns")}
          </div>
        </Link>
        <div className="md:flex justify-between">
          <ProductCard assortment="NewGuns" url="/product?condition=0" />
          <ProductCard assortment="OldGuns" url="/product?condition=1" />
          <ProductCard assortment="OnlineStore" url="https://kobayashi-guns.raku-uru.jp/" />
        </div>
      </div>
      <div className="bg-gray-200 py-64 mb-32 md:mb-44 lg:mb-64">
        <div className="w-[90%] mx-auto">
          <p className="mb-10 md:mb-16 text-3xl">{t("Headline.News")}</p>
          <NewsArticle />
          <Button url="/news" />
        </div>
      </div>
      <div className="image-component">
        <div className="flex-component ml-auto">
          <div className="description px-4 md:pl-0 md:pr-[46px] md:ml-5 lg:ml-8 mb-12">
            <p className="mb-10 text-3xl">{t("Headline.CorporateName")}</p>
            <div className="md:pr-[46px] leading-loose whitespace-pre-wrap">
              {t("CorporateName.Description")}
            </div>
          </div>
          <div className="flex-image">
            <Image src="/aboutus.png" alt="" />
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-10 md:py-20 lg:py-40 mb-32 md:mb-44 lg:mb-64">
        <div className="md:w-2/3 lg:w-1/2 mx-auto">
          <div className="relative m-20">
            <Link href={"http://shotgunfun.blog.fc2.com/"}>
              <Image src="/hetakusoclub.png" alt="ヘタクソクラブ" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 border-4 rounded text-xl text-white">
                ヘタクソクラブ
              </div>
            </Link>
          </div>
        </div>
        <div className="md:w-2/3 lg:w-1/2 mx-auto">
          <div className="relative m-20">
            <Link href={"https://www.facebook.com/kobayashiguns"}>
              <Image src="/annex.png" alt="京のてっぽうやAnnex" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 border-4 rounded text-xl text-white">
                京のてっぽうやAnnex
              </div>
            </Link>
          </div>
        </div>
        <div className="md:w-2/3 lg:w-1/2 mx-auto">
          <div className="relative m-20">
            <Link href={"/real_property"}>
              <Image src="/realproperty.png" alt="小林不動産" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-2 border-4 rounded text-xl text-white">
                小林不動産
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="mb-16">
        <p className="w-[90%] mx-auto mb-10 text-3xl">{t("Headline.StoreLocations")}</p>
        <div className="flex-component">
          <div className="flex-image h-[300px] lg:h-[450px]">
            <Map />
          </div>
          <div className="flex-1 w-[95%] md:pl-5 pt-8 md:pt-0 mx-auto">
            <div className="mb-8 text-xl font-bold parent">
              {t("StoreLocations.CorporateName")}
            </div>
            <div className="mb-8 parent">
              <p>{t("StoreLocations.PostalCode")}</p>
              <p>{t("StoreLocations.Address")}</p>
            </div>
            <div className="mb-8 parent">
              <div className="flex mb-3">
                <p className="w-[86px] rounded text-center bg-[#3F5D75] text-[#DFB94A] py-1 mr-3">
                  {t("StoreLocations.BusinessHours")}
                </p>
                <p className="py-1">{t("StoreLocations.Hours")}</p>
              </div>
              <div className="flex">
                <p className="w-[86px] rounded text-center bg-[#3F5D75] text-[#DFB94A] py-1 mr-3">
                  {t("StoreLocations.RegureClosingDay")}
                </p>
                <p className="py-1">{t("StoreLocations.Days")}</p>
              </div>
            </div>
            <p className="mb-1">{t("StoreLocations.ByCar")}</p>
            <p className="mb-3 whitespace-pre-wrap">{t("StoreLocations.CarInformation")}</p>
            <p className="mb-1">{t("StoreLocations.ByTrain")}</p>
            <p className="whitespace-pre-wrap">{t("StoreLocations.TrainInformation")}</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Index;
