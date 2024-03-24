const MediaList = ({ items, open }: { items: MediaData[]; open: (i: number) => void }) => {
  const URL = process.env.NEXT_PUBLIC_CLOUDFLARE_URL;
  const list = items.map((v: MediaData, i: number) => {
    return (
      <div key={i.toString()} className="mb-4 items-baseline [&_p]:text-xs">
        <button onClick={() => open(i)} className="hover:text-gray-400 mr-4">
          <div>{v.name}</div>
          <img src={`${URL}${v.urn}`} alt="" />
        </button>
      </div>
    );
  });

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(theme(spacing.72),1fr))] gap-2">
      {list}
    </div>
  );
};

export default MediaList;
