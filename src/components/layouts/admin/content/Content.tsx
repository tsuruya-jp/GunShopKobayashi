import Icon from '@mdi/react';
import { mdiMenu } from '@mdi/js';

const Content = (props: any) => {
  return (
    <div className="w-full">
      <header className="pt-5 px-6 flex">
        <div className="pt-1 px-2 w-fit rounded hover:bg-slate-200">
          <button onClick={() => props.changeSidebar()}>
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