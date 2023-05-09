import styles from './ButtonTest.module.scss'

type ButtonTestProps = {
  label: string;
  onClick?: () => void;
};

export const ButtonTest = ({
  label,
  ...props
}:ButtonTestProps) => {
  return(
    <>
      <button {...props} className="flex justify-center m-auto">
        <a className={`${styles.a} flex justify-center items-center w-24 p-1`}>
          {label}
        </a>
      </button>
    </>
  );
}

export default ButtonTest;