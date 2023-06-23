import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listNews = async () => {
  const result = await prisma.news.findMany({
    take: 5,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return result;
};

export default listNews;
