import { prisma } from "@/lib/prisma";

const listNews = async (value?: number) => {
  const quantity = value !== 0 ? value : undefined;
  const result = await prisma.news.findMany({
    take: quantity,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return result;
};

export default listNews;
