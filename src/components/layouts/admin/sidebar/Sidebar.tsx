import Icon from '@mdi/react';
import { mdiAccount, mdiFileDocumentEdit, mdiFolderMultipleImage, mdiPistol } from '@mdi/js';
import styles from './Sidebar.module.css';

type SidebarProps = {
  disabled: boolean;
};

const Sidebar = ({ disabled }: SidebarProps) => {
  return (
    <aside className={`${styles.sidebar} ${disabled ? styles.sidebar_o : ''} w-full p-6`}>
      <div className='flex'>
        <Icon path={mdiFileDocumentEdit} size={1} />
        投稿
      </div>
      <div className='flex'>
        <Icon path={mdiPistol} size={1} />
        商品
      </div>
      <div className='flex'>
        <Icon path={mdiFolderMultipleImage} size={1} />
        メディア
      </div>
      <div className='flex'>
        <Icon path={mdiAccount} size={1} />
        ユーザー
      </div>
    </aside>
  );
};

export default Sidebar;
