"use client"

import { ReactNode} from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

const AdminLayout = ({ children }: { children: ReactNode }, { pageProps }: AppProps) => {

  return (
    <SessionProvider session={pageProps}>
      {children}
    </SessionProvider>
  );
};

export default AdminLayout;
