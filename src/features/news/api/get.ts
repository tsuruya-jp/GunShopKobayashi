import { prisma } from "@/lib/prisma";

const getNews = async (id: string) => {
  const result = await prisma.news.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

export default getNews;
