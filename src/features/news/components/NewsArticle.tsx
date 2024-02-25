import { format } from "date-fns";
import Link from "next/link";

export const NewsArticle = ({ data }: { data: NewsData[] }) => {
  const newsList = data.map((v: NewsData) => {
    const date = format(new Date(v.createdAt!), "yyyy-MM-dd");
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
  return <div className="md:mx-[60px] md:mb-[60px]">{newsList}</div>;
};
