import { Pagination } from "@/features/news/conponents/pagnation/Pagination";

export default function BlogPageId({ totalCount, currentPageNumber }) {
  return (
    <>
      <Pagination currentPageNumber={currentPageNumber} maxPageNumber={Math.ceil(totalCount / 4)} />
    </>
  );
}

export const getStaticPaths = async () => {
  const range = (start, end) => [...Array(end - start + 1)].map((_, i) => start + i);
  const data = await client.get({ endpoint: 'blogs' });

  const { totalCount } = data;
  const paths = range(1, Math.ceil(totalCount / 4)).map((i) => `/news/list/${i}`);
  return { paths, fallback: false };
};

export const getStaticProps = async (context: { params: { id: any; }; }) => {
  const numId = context.params.id;
  const offset = (numId - 1) * 4;
  const limit = 4;
  const queries = { offset: offset, limit: limit };
  const data = await client.get({ endpoint: 'blogs', queries: queries });


  return {
    props: {
      blog: data.contents,
      totalCount: data.totalCount,
      currentPageNumber: numId,
    },
  };
};