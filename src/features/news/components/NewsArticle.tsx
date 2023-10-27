import { format } from "date-fns";
import Link from "next/link";
import listNews from "../api/list";

const getData = async () => {
  const data = await listNews(5, 0);
  const news: NewsData[] = await JSON.parse(JSON.stringify(data));
  return news;
};

export const NewsArticle = async () => {
  const data = await getData();
  const newsList = data.map((v: NewsData) => {
    const date = format(new Date(v.createdAt), "yyyy-MM-dd");
    const permalink = String(date + "_" + v.title);
    return (
      <div key={v.id} className={`mb-4 md:mb-8 parent md:flex`}>
        <p className="w-[100px] mr-[60px] text-[8px] md:text-base">{date}</p>
        <Link href={`/news/${permalink}`} passHref>
          <p>{v.title}</p>
        </Link>
      </div>
    );
  });
  return(
    <div className="md:mx-[60px] md:mb-[60px]">
      {newsList}
    </div>
  );
};