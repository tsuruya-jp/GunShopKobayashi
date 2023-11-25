import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export default async function LocaleLayout({ children, params: { locale } }: Props) {
  let messages;
  const timeZone = "Asia/Tokyo";
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <script src="http://localhost:8097"></script>
        <title>next-intl & next-auth</title>
      </head>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
          <Header />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
