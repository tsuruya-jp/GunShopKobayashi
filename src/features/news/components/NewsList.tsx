import { format } from "date-fns";

const NewsList = ({ items, open }: { items: NewsData[]; open: (i: number) => void }) => {
  const list = items.map((v: NewsData, i: number) => {
    const created = format(new Date(v.createdAt!), "yyyy-MM-dd");
    const updated = format(new Date(v.updatedAt!), "yyyy-MM-dd");
    return (
      <div key={i.toString()} className="mb-4 flex items-baseline [&_p]:text-xs">
        <button onClick={() => open(i)} className="hover:text-gray-400 mr-4">
          {v.title}
        </button>
        <p>更新日時: </p>
        <p className="mr-2">{updated}</p>
        <p>作成日時: </p>
        <p>{created}</p>
      </div>
    );
  });

  return <>{list}</>;
};

export default NewsList;
