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
        <div className="mt-8 text-lg whitespace-pre-wrap">{t("RealState.Description")}</div>
      </div>
    </main>
  );
};

export default ProductPage;
