import ButtonTest from "@/components/elements/button/ButtonTest";
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from "next/router";

export default function Index() {
  const router = useRouter();
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        {JSON.stringify(session)}
        <ButtonTest label="Sign Out" onClick={() => signOut()}/>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <ButtonTest label="Sign In" onClick={() => router.push("/login")} />
    </>
  )
}