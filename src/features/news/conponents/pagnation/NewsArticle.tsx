import { format } from "date-fns";
import Link from "next/link";
import styles from "../../../../styles/Top.module.scss";

export const NewsArticle = ({ data }: NewsArticleProps) => {
  const newsList = data.data.map((v: NewsData) => {
    const date = format(new Date(v.createdAt), "yyyy-MM-dd");
    const permalink = String(date + "_" + v.title);
    return (
      <div key={v.id} className={`mb-8 ${styles.parent} flex`}>
        <p className="w-[100px] mr-[60px]">{date}</p>
        <Link href={`/news/${permalink}`} passHref>
          <p>{v.title}</p>
        </Link>
      </div>
    );
  });
  return(
    <div className="mx-[60px] mb-[60px]">
      {newsList}
    </div>
  );
};