import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const listNews = async (quantity?: number) => {
  const result = await prisma.news.findMany({
    take: quantity,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return result;
};

export default listNews;
