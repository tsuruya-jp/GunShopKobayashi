import { mdiPlus } from "@mdi/js";
import styles from "./Button.module.scss";
import Icon from "@mdi/react";

type ButtonProps = {
  label?: string;
  url?: string;
  onClick?: () => void;
};

export const Button = ({ label = "More", url, ...props }: ButtonProps) => {
  return (
    <>
      <button {...props} className="flex justify-center m-auto">
        <a
          href={`/${url}`}
          className={`${styles.a} flex justify-center items-center px-20 py-2 text-xs`}
        >
          <Icon path={mdiPlus} size={1} />
          {label}
        </a>
      </button>
    </>
  );
};

export default Button;
