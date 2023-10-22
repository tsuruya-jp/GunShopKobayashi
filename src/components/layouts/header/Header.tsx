import Link from "next/link";
import { useTranslation } from "next-i18next";
const Header = () => {
  const { t } = useTranslation("common");
  return (
    <header className="h-20 flex justify-center shadow-md shadow-black/50 z-10 relative md:justify-between bg-[#3F5D75]">
      <div className="my-auto md:ml-7">logo</div>
      <div className={`my-auto hidden md:flex [&_div]:mr-6 [&_a]:text-[14px]`}>
        <div className="text-[#DFB94A]">
          <Link href="/product">{t("Header.ProductList")}</Link>
        </div>
        <div className="text-[#DFB94A]">
          <Link href="/about">{t("Header.AboutUs")}</Link>
        </div>
        <div className="text-[#DFB94A]">
          <Link href="/news">{t("Header.News")}</Link>
        </div>
        <div className="text-[#DFB94A]">
          <Link href="contact">{t("Header.Contact")}</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
