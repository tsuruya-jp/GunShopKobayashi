import styles from "./Header.module.css";
import { useTranslation } from "next-i18next";
const Header = () => {
  const { t } = useTranslation("common");
  return (
    <header className="h-20 flex justify-center shadow-md shadow-black/50 z-10 relative md:justify-between bg-[#3F5D75]">
      <div className="my-auto md:ml-7">logo</div>
      <div className={`my-auto hidden md:flex ${styles.h_div}`}>
        <div className="text-[#DFB94A]">
          <a href="">{t("Header.ProductList")}</a>
        </div>
        <div className="text-[#DFB94A]">
          <a href="">{t("Header.ShopInfomation")}</a>
        </div>
        <div className="text-[#DFB94A]">
          <a href="">{t("Header.Contact")}</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
