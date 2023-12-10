const News = ({ data }: { data: NewsData[] }) => {
  const posts = data.map((v) => {
    return (
      <div key={v.id}>
        <div>{v.title}</div>
      </div>
    );
  });

  return <div>{posts}</div>;
};

export default News;