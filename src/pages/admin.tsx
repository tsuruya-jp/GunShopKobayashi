import ButtonTest from "@/components/elements/button/ButtonTest";
import { signOut } from 'next-auth/react';
import { getSession } from 'next-auth/react';
import { useRouter } from "next/router";
import { useEffect } from "react";

const Admin = () => {
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const session = await getSession()        
      if (!session) {
        router.push('/login')
      }
    })()     
  }, [])

  return(
    <>
      wellcome
      <ButtonTest label="Logout" onClick={() => signOut()}/>
    </>
  )
}

export default Admin;