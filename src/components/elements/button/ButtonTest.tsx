import { AiOutlineRight } from "react-icons/ai";
import styles from './ButtonTest.module.scss'

type ButtonTestProps = {
  primary: boolean;
  label: string;
  onClick?: () => void;
};

export const ButtonTest = ({
  label,
}:ButtonTestProps) => {
  return(
    <>
      <div className="flex justify-center">
        <a className={`${styles.a} flex justify-center items-center w-24 p-1`}>
          {label}
          <AiOutlineRight />
        </a>
      </div>
    </>
  );
}

export default ButtonTest;