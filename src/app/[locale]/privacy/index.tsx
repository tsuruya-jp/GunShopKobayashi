import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import { GetServerSideProps } from "next";
import { useTranslation } from "react-i18next";

const Privacy = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <Header />
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>{t("Privacy.Headline")}</h1>
        <div className="mb-10">
          <h2 className="text-xl">個人情報の収集</h2>
          <p>業務上、法令等により個人情報を収集する義務が生じます。</p>
          <p>当サイトをご利用の際にも個人情報を収集することがあります。</p>
        </div>
        <div className="mb-10">
          <h2 className="text-xl">個人情報の利用</h2>
          <p>守秘義務の下、個人情報は第三者へ開示しません。</p>
          <p>但し、法令に基づく調査等、業務上必要と判断した場合はご本人の承諾なく情報を提供する場合があります。</p>
          <p>お客様に有益と思われる情報の提供に使用する場合があります。</p>
        </div>
        <div className="mb-10">
          <h2 className="text-xl">個人情報の安全管理</h2>
          <p className="mb-6">お客様よりお預かりした個人情報の漏洩・滅失等防止に努めます。</p>
        </div>
        <div className="mb-10">
          <h2 className="text-xl">個人情報の訂正・削除</h2>
          <p>お客様よりお預かりした個人情報の訂正・削除は弊社へお知らせ下さい。可能な限り応じます。</p>
        </div>
        <div className="mb-10">
          <h2 className="text-xl">お問合せ先</h2>
          <p>特定商取引の基づく表記をご覧下さい。</p>
        </div>
        <div className="mb-20">
          <h2 className="text-xl">プライバシーポリシーの変更</h2>
          <p>弊店では収集する個人情報の保持について変更を行う際は当サイトにて告知をいたします。</p>
        </div>
        <div className="mb-20">
          <h2 className="text-xl">&lt;&lt; 免責事項 &gt;&gt;</h2>
          <p>当サイトはお客様に有益な情報を提供いたします。</p>
          <p>利用に際してのトラブル・損失・損害について弊社は責任を負いません。</p>
          <p>また、当サイトからのリンク先のトラブル等に関しても弊社は責任を負いません。</p>
          <p>当サイトに掲載しているコンテンツは有限会社小林銃砲火薬店が所有しています。許可なく使用することを禁止いたします。</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Privacy;
