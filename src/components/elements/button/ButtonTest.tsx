import styles from './ButtonTest.module.scss'
import {ChevronRightIcon} from '@chakra-ui/icons'

type ButtonTestProps = {
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
          <ChevronRightIcon />
        </a>
      </div>
    </>
  );
}

export default ButtonTest;