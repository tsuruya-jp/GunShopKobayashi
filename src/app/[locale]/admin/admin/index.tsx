import { GetServerSideProps } from "next";
import listNews from "@/features/news/api/list";

const News = ({ data }: NewsArticle) => {
  const posts = data.map((v) => {
    return (
      <div key={v.id}>
        <div>{v.title}</div>
      </div>
    )
  });

  return <div>{ posts }</div>;
}

const Admin = ({ news }: { news: NewsData[] }) => {
  return (
    <News data={ news } />
  );
};

export default Admin;

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await listNews();
  const news: NewsData[] = await JSON.parse(JSON.stringify(data));

  return {
    props: {
      news: news
    },
  };
};
