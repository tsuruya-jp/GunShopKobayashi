"use client";

import { signIn } from "next-auth/react";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

const Login = () => {
  const locale = useLocale();
  const router = useRouter();
  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      username: formData.get("userName"),
      password: formData.get("password"),
      redirect: false,
    });

    if (result?.error) alert(result.error); 
    else router.push(`/${locale}/admin`);
  };

  return (
    <div className="bg-white py-6 sm:py-8 lg:py-12 h-screen">
      <div className="mx-auto max-w-screen-2xl px-4 md:px-8 h-full">
        <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">
          Login
        </h2>
        <form
          method="post"
          action="/api/auth/callback/credentials"
          onSubmit={onSubmit}
          className="mx-auto max-w-lg rounded-lg border"
        >
          <div className="flex flex-col gap-4 p-4 md:p-8">
            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                User Name
              </label>
              <input
                name="userName"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <div>
              <label className="mb-2 inline-block text-sm text-gray-800 sm:text-base">
                Password
              </label>
              <input
                name="password"
                className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring"
              />
            </div>
            <button
              type="submit"
              className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base"
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
