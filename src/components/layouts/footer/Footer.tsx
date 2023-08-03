import Icon from "@mdi/react";
import { mdiFacebook } from "@mdi/js";
import { useTranslation } from "next-i18next";
const Footer = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <footer className="md:h-[360px] bg-[#666] [&_p]:text-white [&_a]:text-white [&_p]:text-xs md:[&_p]:text-base [&_a]:text-xs md:[&_a]:text-base">
        <div className="pt-2 md:pt-10 md:flex">
          <div className="md:w-1/4 my-auto">
            <div className="flex justify-center">logo</div>
            <div className="w-fit mx-auto">
              <p className="md:mt-8 text-xs md:text-base">TEL : 075-841-8866</p>
              <p className="text-xs md:text-base">E-mail : xxxxx@xxx.co.jp</p>
              <div className="mt-1 md:mt-7 pb-3 md:pb-0">
                <Icon className="absolute z-50" path={mdiFacebook} size={1} color={"blue"} />
                <div className="w-4 h-4 relative top-1 left-1 rounded-[50%] overflow-hidden bg-white"></div>
              </div>
            </div>
          </div>
          <div className="md:h-[280px] w-[90%] md:w-px my-auto mx-auto bg-white"></div>
          <div className="hidden md:block w-3/4 mt-6 mb-auto">
            <div className="w-[90%] mx-auto flex justify-between">
              <div className="w-[30%]">
                <div className="parent">
                  <a href="">{t("Footer.Home")}</a>
                </div>
                <div className="pt-4">
                  <a href="">{t("Footer.ProductList")}</a>
                </div>
                <div className="pl-5 pt-4">
                  <a href="">{t("Footer.NewGuns")}</a>
                </div>
                <div className="pl-5 pt-4">
                  <a href="">{t("Footer.OldGuns")}</a>
                </div>
                <div className="pl-5 pt-4">
                  <a href="">{t("Footer.OnlineStore")}</a>
                </div>
              </div>
              <div className="w-[30%]">
                <div className="parent">
                  <a href="">{t("Footer.News")}</a>
                </div>
                <div className="pt-4">
                  <a href="">{t("Footer.AboutUs")}</a>
                </div>
                <div className="pl-5 pt-4">
                  <a href="">{t("Footer.CorporateInformation")}</a>
                </div>
                <div className="pl-5 pt-4">
                  <a href="">{t("Footer.History")}</a>
                </div>
                <div className="pl-5 pt-4">
                  <a href="">{t("Footer.OurBusiness")}</a>
                </div>
              </div>
              <div className="w-[30%]">
                <div className="parent">
                  <a href="">{t("Footer.Links")}</a>
                </div>
                <div className="parent pt-4">
                  <a href="">{t("Footer.Contact")}</a>
                </div>
                <div className={`pt-4`}>
                  <a href="">{t("Footer.PrivacyPolicy")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="text-center pb-4">{t("Footer.CopyRight")}</p>
      </footer>
    </>
  );
};

export default Footer;
