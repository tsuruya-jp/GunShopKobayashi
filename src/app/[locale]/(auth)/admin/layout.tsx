"use client";

import Sidebar from "@/components/layouts/admin/sidebar/Sidebar";
import { ReactNode, useState } from "react";
import Content from "@/components/layouts/admin/content/Content";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [isSidebar, setBoolean] = useState(true);
  const changeSidebar = () => {
    setBoolean(!isSidebar);
  };

  return (
    <div className={`h-screen flex duration-300 ${isSidebar ? "pl-[250px]" : ""}`}>
      <Sidebar disabled={isSidebar} />
      <Content change={changeSidebar}>{children}</Content>
    </div>
  );
};

export default AdminLayout;
