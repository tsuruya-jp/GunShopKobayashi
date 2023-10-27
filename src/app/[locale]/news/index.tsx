import Header from "@/components/layouts/header/Header";
import Footer from "@/components/layouts/footer/Footer";
import { Pagination } from "../../../features/news/components/Pagination";
import { GetServerSideProps } from "next";
import { NewsArticle } from "@/features/news/components/NewsArticle";
import listNews from "@/features/news/api/list";
import countNews from "@/features/news/api/count";
import { GetWindowSize } from "@/lib/hook";
import { useTranslations } from "next-intl";

type Props = {
  data: NewsData[];
  pagination: {
    count: number;
    currentPage: number;
  };
};

const NewsList = ({ data, pagination }: Props) => {
  const { windowHeight, windowWidth } = GetWindowSize();
  let height = 0;
  if (windowWidth >= 768) {
    height = windowHeight - 640;
  } else {
    height = windowHeight - 448;
  }
  const t = useTranslations("News");

  return (
    <>
      <Header />
      <div
        className={`w-[90%] max-w-[880px] mx-auto mt-[80px] mb-[120px]`}
        style={{ minHeight: height }}
      >
        <h1 className={`title font-bold mb-14`} suppressHydrationWarning={true}>
          {t("News.Headline")}
        </h1>
        <div className="w-[90%] mx-auto">
          <NewsArticle data={data} />
        </div>
        <Pagination pagination={pagination} />
      </div>
      <Footer />
    </>
  );
};

export default NewsList;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryString = query.page ?? "";
  const currentPage = () => {
    if (Number(queryString) <= 1) {
      return 1;
    }
    return Number(queryString);
  };
  const offset = (currentPage() - 1) * 10;
  const data = await listNews(10, offset);
  const news: NewsData[] = await JSON.parse(JSON.stringify(data));
  const count = await countNews();

  return {
    props: {
      data: news,
      pagination: {
        count: count,
        currentPage: currentPage(),
      },
    },
  };
};