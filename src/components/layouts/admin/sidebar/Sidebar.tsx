import Icon from "@mdi/react";
import { mdiAccount, mdiFileDocumentEdit, mdiFolderMultipleImage, mdiPistol } from "@mdi/js";
import styles from "./Sidebar.module.css";
import Link from "next/link";

type SidebarProps = {
  disabled: boolean;
};

const Sidebar = ({ disabled }: SidebarProps) => {
  return (
    <aside className={`${styles.sidebar} ${disabled ? styles.sidebar_o : ""} w-full p-6`}>
      <Link href={"/admin/news"} className="[&_*]:hover:text-gray-300">
        <div className="flex">
          <Icon path={mdiFileDocumentEdit} size={1} />
          <p>投稿</p>
        </div>
      </Link>
      <Link href={"/admin/product"} className="[&_*]:hover:text-gray-300">
        <div className="flex">
          <Icon path={mdiPistol} size={1} />
          <p>商品</p>
        </div>
      </Link>
      <Link href={"/admin/media"} className="[&_*]:hover:text-gray-300">
        <div className="flex">
          <Icon path={mdiFolderMultipleImage} size={1} />
          <p>メディア</p>
        </div>
      </Link>
      <Link href={"/admin/user"} className="[&_*]:hover:text-gray-300">
        <div className="flex">
          <Icon path={mdiAccount} size={1} />
          <p>ユーザー</p>
        </div>
      </Link>
    </aside>
  );
};

export default Sidebar;
