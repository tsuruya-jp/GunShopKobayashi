import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]";
import Sidebar from "@/components/layouts/admin/sidebar/Sidebar";
import Content from "@/components/layouts/admin/content/Content";
import { useState } from "react";

const Admin = () => {
  const [isSidebar, setBoolean] = useState(true);
  const changeSidebar = () => {
    setBoolean(!isSidebar);
  }

  return(
    <div className={`h-screen flex duration-300 ${isSidebar ? "pl-[250px]" : ""}`}>
      <Sidebar disabled={isSidebar} />
      <Content changeSidebar={changeSidebar}/>
    </div>
  )
}

export default Admin;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const session = await getServerSession(context.req, context.res, options);
  if (!session) {
    return {
      redirect: {
        destination: '/admin/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}