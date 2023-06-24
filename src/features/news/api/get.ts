import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getNews = async (id: string) => {
  const result = await prisma.news.findUnique({
    where: {
      id: id,
    },
  });

  return result;
};

export default getNews;
