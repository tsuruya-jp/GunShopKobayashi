import { mdiPlus } from "@mdi/js";
import styles from "./MoreButton.module.scss";
import Icon from "@mdi/react";

type MoreButtonProps = {
  label?: string;
  url?: string;
  onClick?: () => void;
};

export const MoreButton = ({ label = "More", url, ...props }: MoreButtonProps) => {
  return (
    <>
      <button {...props} className="flex justify-center m-auto">
        <a href={`/${url}`} className={`${styles.a} flex justify-center items-center px-20 py-2 text-xs`}>
          <Icon path={mdiPlus} size={1} />
          {label}
        </a>
      </button>
    </>
  );
};

export default MoreButton;
