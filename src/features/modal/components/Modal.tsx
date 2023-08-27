import { useTranslation } from "react-i18next";

const Modal = (props: {
  show: boolean,
  success: boolean,
  changeModal: any
}) => {
  const { t } = useTranslation("common");

  return (
    <div className={`${props.show ? "" : "hidden"} fixed z-50 flex justify-center overscroll-none overflow-hidden w-screen h-screen bg-black/50`}>
      <div className="absolute top-1/2 bg-white rounded-lg mx-auto p-6 text-center">
        <div className="mb-4" suppressHydrationWarning={true}>{props.success ? t("Contact.Success") : t("Contact.Failed")}</div>
        <button className="rounded-md py-1 px-2 bg-slate-200" onClick={() => props.changeModal()}>Close</button>
      </div>
    </div>
  );
};

export default Modal;