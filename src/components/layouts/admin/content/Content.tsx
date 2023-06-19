import Icon from '@mdi/react';
import { mdiLogout, mdiMenu } from '@mdi/js';
import { signOut, useSession } from 'next-auth/react';
import dynamic from 'next/dynamic';

const TextEditor = dynamic(import("../../../../features/editor/TextEditor"), {ssr: false});

const Content = (props: any) => {
  const { data: session } = useSession();
  return (
    <div className="w-full bg-gray-100">
      <header className="pt-5 px-6 flex justify-between">
        <div className="my-auto">
          <button className="py-1 px-2 w-fit rounded hover:bg-slate-200" onClick={() => props.changeSidebar()}>
            <Icon path={mdiMenu} size={1} />
          </button>
        </div>
        <div className="flex">
          <div className="ml-auto my-auto">{session ? session.user.username : ""}</div>
          <div className="mx-4 w-px bg-black"></div>
          <div className="text-xs m-auto text-center">
            <button className="w-fit rounded hover:bg-slate-200" onClick={() => signOut()}>
              <Icon className="m-auto" path={mdiLogout} size={1} />
              <div>logout</div>
            </button>
          </div>
        </div>
      </header>
      <main className="p-6">
        <TextEditor />
      </main>
    </div>
  )
}

export default Content;