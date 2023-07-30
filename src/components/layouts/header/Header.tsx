import styles from "./Header.module.scss";
import { useTranslation } from "next-i18next";
const Header = () => {
  const { t } = useTranslation("common");
  return (
    <>
      <header className="h-20 flex justify-center md:justify-between bg-gray-100">
        <div className="my-auto md:ml-7">logo</div>
        <div className={`my-auto hidden md:flex ${styles.h_div}`}>
          <div>
            <a href="">{t("Header.ProductList")}</a>
          </div>
          <div>
            <a href="">{t("Header.ShopInfomation")}</a>
          </div>
          <div>
            <a href="">{t("Header.Contact")}</a>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
