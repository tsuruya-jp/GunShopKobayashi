import ButtonTest from "@/components/elements/button/ButtonTest";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth/next";
import { signOut } from 'next-auth/react';
import { options } from "./api/auth/[...nextauth]";

const Admin = () => {
  return(
    <>
      wellcome
      <ButtonTest label="Logout" onClick={() => signOut()}/>
    </>
  )
}

export default Admin;

export const getServerSideProps: GetServerSideProps = async(context) => {
  const session = await getServerSession(context.req, context.res, options);
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }
  return {
    props: {},
  }
}