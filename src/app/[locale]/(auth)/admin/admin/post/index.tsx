import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import Sidebar from "@/components/layouts/admin/sidebar/Sidebar";
import Content from "@/components/layouts/admin/content/Content";
import { useState } from "react";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { TextField } from "@mui/material";
import { options } from "@/app/api/auth/[...nextauth]/route";

const TextEditor = dynamic(import("../../../../../features/editor/TextEditor"), { ssr: false });

const Admin = ({ pageProps }: AppProps) => {
  const [isSidebar, setBoolean] = useState(true);
  const changeSidebar = () => {
    setBoolean(!isSidebar);
  };

  return (
    <div className={`h-screen flex duration-300 ${isSidebar ? "pl-[250px]" : ""}`}>
      <SessionProvider session={pageProps}>
        <Sidebar disabled={isSidebar} />
        <Content change={changeSidebar}>
          <div>
            <TextField
              className="bg-white"
              required
              label="タイトル"
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <TextEditor />
        </Content>
      </SessionProvider>
    </div>
  );
};

export default Admin;

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
