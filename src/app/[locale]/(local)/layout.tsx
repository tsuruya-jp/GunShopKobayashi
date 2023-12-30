import { ReactNode } from "react";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: "小林銃砲火薬店",
}

const LocaleLayout = async ({ children }: Props) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}

export default LocaleLayout;
