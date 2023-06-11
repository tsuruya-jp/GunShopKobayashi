import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

const Content = (props: any) => {
  return (
    <div className="w-full bg-gray-100">
      <header className="pt-5 px-6 flex">
        <div>
          <button className="py-1 px-2 w-fit rounded hover:bg-slate-200" onClick={() => props.changeSidebar()}>
            <Icon path={mdiMenu} size={1} />
          </button>
        </div>
      </header>
      <main className="h-full p-6">
        MainSection
      </main>
    </div>
  )
}

export default Content;