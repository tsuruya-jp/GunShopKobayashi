"use client"

import Sidebar from "@/components/layouts/admin/sidebar/Sidebar";
import { ReactNode, useState } from "react";
import Content from "@/components/layouts/admin/content/Content";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";

const AdminLayout = ({ children }: { children: ReactNode }, { pageProps }: AppProps) => {
  const [isSidebar, setBoolean] = useState(true);
  const changeSidebar = () => {
    setBoolean(!isSidebar);
  };

  return (
    <SessionProvider session={pageProps}>
    <div className={`h-screen flex duration-300 ${isSidebar ? "pl-[250px]" : ""}`}>
      <Sidebar disabled={isSidebar} />
      <Content change={changeSidebar}>{children}</Content>
    </div>
    </SessionProvider>
  );
};

export default AdminLayout;
