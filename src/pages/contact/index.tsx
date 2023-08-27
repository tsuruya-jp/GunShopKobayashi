import Footer from "@/components/layouts/footer/Footer";
import Header from "@/components/layouts/header/Header";
import Modal from "@/features/modal/components/Modal";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

type FormInputs = {
  lastName: String;
  firstName: String;
  telNumber: String;
  email: String;
  message: String;
};

const Contact = () => {
  const { t } = useTranslation("common");
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  const changeModal = () => {
    setShow(!show);
    if (show) {
      document.body.style.overflow = "auto";
    } else {
      document.body.style.overflow = "hidden";
    }
  };

  const sendMail: SubmitHandler<FormInputs> = async (form) => {
    const result = await fetch("/api/mail", {
      method: "POST",
      body: JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        telNumber: form.telNumber,
        email: form.email,
        message: form.message,
      }),
    });
    if (result.status != 200) {
      setSuccess(false);
    }
    changeModal();
  };

  return (
    <>
      <Modal show={show} success={success} changeModal={changeModal} />
      <Header />
      <main className="w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]">
        <h1 className="title font-bold mb-16" suppressHydrationWarning={true}>
          {t("Contact.Headline")}
        </h1>
        <form className="w-[600px] mx-auto" onSubmit={handleSubmit(sendMail)}>
          <div className="flex justify-between mx-auto mb-6">
            <div className="">
              <div suppressHydrationWarning={true}>{t("Contact.LastName")}</div>
              <input
                type="text"
                className="w-[290px] h-[50px] rounded-md bg-slate-300 p-4"
                {...register("lastName", {
                  required: "入力が必須の項目です",
                })}
              />
              {errors.lastName && (
                <div className="text-red-500 pl-1 pt-1 text-xs">{errors.lastName.message}</div>
              )}
            </div>
            <div className="">
              <div suppressHydrationWarning={true}>{t("Contact.FirstName")}</div>
              <input
                type="text"
                className="w-[290px] h-[50px] rounded-md bg-slate-300 p-4"
                {...register("firstName", {
                  required: "入力が必須の項目です",
                })}
              />
              {errors.firstName && (
                <div className="text-red-500 pl-1 pt-1 text-xs">{errors.firstName.message}</div>
              )}
            </div>
          </div>
          <div className="mb-6">
            <div suppressHydrationWarning={true}>{t("Contact.TelNumber")}</div>
            <input
              type="tel"
              className="w-full h-[50px] rounded-md bg-slate-300 p-4"
              {...register("telNumber", {
                required: "入力が必須の項目です",
              })}
            />
            {errors.telNumber && (
              <div className="text-red-500 pl-1 pt-1 text-xs">{errors.telNumber.message}</div>
            )}
          </div>
          <div className="mb-6">
            <div suppressHydrationWarning={true}>{t("Contact.Email")}</div>
            <input
              type="email"
              className="w-full h-[50px] rounded-md bg-slate-300 p-4"
              {...register("email", {
                required: "入力が必須の項目です",
                pattern: {
                  value: /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
                  message: "正しい形式で入力してください",
                },
              })}
            />
            {errors.email && (
              <div className="text-red-500 pl-1 pt-1 text-xs">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-12">
            <div suppressHydrationWarning={true}>{t("Contact.Message")}</div>
            <textarea
              className="w-full h-[400px] resize-none rounded-md bg-slate-300 p-4"
              {...register("message", {
                required: "入力が必須の項目です",
              })}
            />
            {errors.message && (
              <div className="text-red-500 pl-1 pt-1 text-xs">{errors.message.message}</div>
            )}
          </div>
          <div className="text-center">
            <input
              type="submit"
              value={t("Contact.Send")}
              className="rounded-md bg-slate-300 py-1 px-4"
            />
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
};

export default Contact;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const translations = await serverSideTranslations(locale!, ["common"]);

  return {
    props: { ...translations },
  };
};
