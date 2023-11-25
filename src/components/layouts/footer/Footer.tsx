"use client"

import Icon from "@mdi/react";
import Link from "next/link";
import { mdiFacebook } from "@mdi/js";
import { useTranslations } from "next-intl";
import Logo from "@/components/elements/logo/Logo";

const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <footer className="md:h-[360px] bg-[#3F5D75] [&_p]:text-[#DFB94A] [&_a]:text-[#DFB94A] [&_p]:text-xs md:[&_p]:text-base [&_a]:text-xs md:[&_a]:text-base">
      <div className="pt-6 md:pt-10 md:flex">
        <div className="md:w-1/4 my-auto">
          <div className="flex justify-center w-[200px] mx-auto">
            <Logo />
          </div>
          <div className="w-fit mx-auto">
            <p className="md:mt-8 text-xs md:text-base">TEL : 075-841-8866</p>
            <p className="text-xs md:text-base">E-mail : xxxxx@xxx.co.jp</p>
            <div className="mt-1 md:mt-7 pb-3 md:pb-0 w-fit">
              <Link href="https://www.facebook.com/kobayashiguns">
                <Icon className="" path={mdiFacebook} size={1} color={"white"} />
              </Link>
            </div>
          </div>
        </div>
        <div className="md:h-[280px] w-[90%] md:w-px my-auto mx-auto bg-white"></div>
        <div className="hidden md:block w-3/4 mt-8 mb-auto">
          <div className="w-[90%] mx-auto flex justify-between mb-20">
            <div className="w-[30%]">
              <div className="after-line">
                <Link href="/">{t("Home")}</Link>
              </div>
              <div className="after-line pt-4">
                <Link href="/news">{t("News")}</Link>
              </div>
              <div className="pt-4">
                <Link href="/about">{t("AboutUs")}</Link>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="">
                <Link href="/">{t("ProductList")}</Link>
              </div>
              <div className="pl-5 pt-4">
                <Link href="/product?condition=0">{t("NewGuns")}</Link>
              </div>
              <div className="pl-5 pt-4">
                <Link href="/product?condition=1">{t("OldGuns")}</Link>
              </div>
              <div className="pl-5 pt-4">
                <Link href="https://kobayashi-guns.raku-uru.jp/">{t("OnlineStore")}</Link>
              </div>
            </div>
            <div className="w-[30%]">
              <div className="after-line">
                <Link href="/contact">{t("Contact")}</Link>
              </div>
              <div className="after-line pt-4">
                <Link href="/links">{t("Links")}</Link>
              </div>
              <div className="pt-4">
                <Link href="/privacy">{t("PrivacyPolicy")}</Link>
              </div>
            </div>
          </div>
          <p className="text-center">{t("CopyRight")}</p>
        </div>
        <p className="text-center pt-4 pb-6 md:hidden">{t("CopyRight")}</p>
      </div>
    </footer>
  );
};

export default Footer;
