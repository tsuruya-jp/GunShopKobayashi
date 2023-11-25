import Logo from "@/components/elements/logo/Logo";
import { useTranslations } from "next-intl";
import Link from "next/link";
const Header = () => {
  const t = useTranslations("Header");
  return (
    <header className="h-20 flex justify-center shadow-md shadow-black/50 z-10 relative md:justify-between bg-[#3F5D75]">
      <div className="my-auto md:ml-7 w-[120px]">
        <Logo />
      </div>
      <div className={`my-auto hidden md:flex [&_div]:mr-6 [&_a]:text-[14px]`}>
        <div className="text-[#DFB94A]">
          <Link href="/product">{t("ProductList")}</Link>
        </div>
        <div className="text-[#DFB94A]">
          <Link href="/about">{t("AboutUs")}</Link>
        </div>
        <div className="text-[#DFB94A]">
          <Link href="/news">{t("News")}</Link>
        </div>
        <div className="text-[#DFB94A]">
          <Link href="contact">{t("Contact")}</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
