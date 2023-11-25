import { useTranslations } from "next-intl";
import Link from "next/link";

const Index = () => {
  const t = useTranslations();
  return (
    <main>
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px] [&_a]:underline [&_a]:decoration-2">
        <h1 className="title font-bold mb-14" suppressHydrationWarning={true}>{t("Links.Headline")}</h1>
        <h2 className="text-xl mb-6">●国内主要銃砲／装弾代理店</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="https://daicel-pyrotechnics.com/">ダイセルパイロテクニクス株式会社</Link></div>
          <div><Link href="https://nippokk.co.jp/">日邦工業株式会社</Link></div>
          <div><Link href="https://www.sightron.co.jp/">株式会社サイトロンジャパン</Link></div>
          <div><Link href="https://guns.co.jp/">株式会社トウキョウジュウホウ</Link></div>
          <div><Link href="https://tagami1946.jp/">TAGAMI</Link></div>
          <div><Link href="http://charme-co.com/">CHARME</Link></div>
        </div>
        <h2 className="text-xl mb-6">●射撃団体</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="https://kyoto-clay.jimdofree.com/ご挨拶/">京都府クレー射撃協会</Link></div>
        </div>
        <h2 className="text-xl mb-6">●射撃場</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="https://www.kasatori.com/">京都笠取国際射撃場</Link></div>
          <div><Link href="http://www.ryoyu-kai.or.jp/takatsuki/">高槻国際射撃場</Link></div>
        </div>
        <h2 className="text-xl mb-6">●その他</h2>
        <div className="[&_div]:leading-8 mb-10 ml-12">
          <div><Link href="https://www.pref.kyoto.jp/fukei/kakushu/juho/">京都府警察本部</Link></div>
        </div>
      </div>
    </main>
  );
};

export default Index;