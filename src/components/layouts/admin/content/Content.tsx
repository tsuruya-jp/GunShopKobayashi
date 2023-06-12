import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';
import { useSession } from 'next-auth/react';
import TextEditor from '@/features/editor/TextEditor';

const Content = (props: any) => {
  const { data: session } = useSession();
  return (
    <div className="w-full bg-gray-100">
      <header className="pt-5 px-6 flex justify-between">
        <div>
          <button className="py-1 px-2 w-fit rounded hover:bg-slate-200" onClick={() => props.changeSidebar()}>
            <Icon path={mdiMenu} size={1} />
          </button>
        </div>
        <div className="ml-auto my-auto">{session ? session.user.username : ""}</div>
      </header>
      <main className="h-full p-6">
        <TextEditor />
      </main>
    </div>
  )
}

export default Content;