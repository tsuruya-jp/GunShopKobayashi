"use client";

import Image from "@/components/elements/image/Image";
import { useTranslations } from "next-intl";

const ProductPage = () => {
  const t = useTranslations();
  return (
    <main>
      <div className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold" suppressHydrationWarning={true}>
          {t("RealState.Headline")}
        </h1>
        <Image src="/images/realstate.png" alt="小林不動産" />
        <div className="mt-8 mb-20 text-lg whitespace-pre-wrap">{t("RealState.Description")}</div>
        <div className="text-center">
          <div className="text-xl mb-4">小林不動産</div>
          <div className="mb-2">代表 小林 幸次郎</div>
          <div className="mb-2">京都市上京区千本通下立売上る稲葉町470番地</div>
          <div className="mb-2">TEL 075-811-5985</div>
          <div className="mb-2">京都府知事(11)第6344号</div>
          <div className="mb-2">提携会社 大手不動産会社数社と提携</div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;
