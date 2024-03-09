import { ReactNode } from "react";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { Metadata } from "next";

type Props = {
  children: ReactNode;
};

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
