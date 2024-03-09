import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";
import { Metadata } from "next";
import Favicon from '/public/images/favicon.ico';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const metadata: Metadata = {
  title: "小林銃砲火薬店",
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default async function Layout({ children, params: { locale } }: Props) {
  let messages;
  const timeZone = "Asia/Tokyo";
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages} timeZone={timeZone}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
