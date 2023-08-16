import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t } = useTranslation("common");
  return(
    <>
      <Header />
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>{t("About.Headline")}</h1>
        <h2 className="text-xl mb-6">会社情報</h2>
        <div className="mb-16">
          <table className="w-[85%] max-w-[840px] table-fix border-separate border border-slate-500 mx-auto text-center">
            <tbody className="[&_td]:border-separate [&_td]:text-sm [&_td]:border [&_td]:border-slate-500">
              <tr>
                <td className="w-1/4">会社名</td>
                <td>（有）小林銃砲火薬店</td>
              </tr>
              <tr>
                <td>住所</td>
                <td>〒602-8352<br />京都府京都市上京区下立売通千本西入稲葉町稲葉町466</td>
              </tr>
              <tr>
                <td>電話番号</td>
                <td>075-841-8866</td>
              </tr>
              <tr>
                <td>FAX</td>
                <td></td>
              </tr>
              <tr>
                <td>代表者</td>
                <td></td>
              </tr>
              <tr>
                <td>創業</td>
                <td></td>
              </tr>
              <tr>
                <td>資本金</td>
                <td></td>
              </tr>
              <tr>
                <td>事業内容</td>
                <td></td>
              </tr>
              <tr>
                <td>社員数</td>
                <td></td>
              </tr>
              <tr>
                <td>取引銀行</td>
                <td></td>
              </tr>
              <tr>
                <td>主要取引先</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="text-xl mb-6">沿革</h2>
        <h2 className="text-xl mb-6">事業内容</h2>
        <ul className="list-disc list-inside">
          <li>銃砲・火薬販売</li>
          <li>猟具販売</li>
          <li>産業火薬販売・運搬</li>
          <li>不動産</li>
        </ul>
      </div>
      <Footer />
    </>
  )
}

export default About;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);

  return {
    props: { ...translations },
  };
};
