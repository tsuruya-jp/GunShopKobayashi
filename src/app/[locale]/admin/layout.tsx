import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import Sidebar from "@/components/layouts/admin/sidebar/Sidebar";
import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { options } from "../../api/auth/[...nextauth]/route";
import Content from "@/components/layouts/admin/content/Content";

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

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(context.req, context.res, options);
  if (!session) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};
