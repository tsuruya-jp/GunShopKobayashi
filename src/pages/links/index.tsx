import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const Links = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>{t("Links.Headline")}</h1>
        <h2 className="text-xl mb-6">●国内主要銃砲／装弾代理店</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="" className="">日邦工業（株）</Link></div>
          <div><Link href="">新エスケービー工業（株）</Link></div>
          <div><Link href="">サイトロンジャパン</Link></div>
          <div><Link href="">旭エスケービー（株）</Link></div>
          <div><Link href="">日本装弾（株）</Link></div>
        </div>
        <h2 className="text-xl mb-6">●射撃団体</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="">日本クレー射撃協会	</Link></div>
          <div><Link href="">学生クレー射撃サークル</Link></div>
        </div>
        <h2 className="text-xl mb-6">●射撃場</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="">笠取国際射撃場　 水・土曜日は小林銃砲店販売所営業中	</Link></div>
          <div><Link href="">高槻国際射撃場</Link></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Links;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);

  return {
    props: { ...translations },
  };
};
