import { prisma } from "@/lib/prisma";

const listNews = async (take?: number, skip?: number) => {
  const quantity = take !== 0 ? take : undefined;
  const point = skip !== 0 ? skip : undefined;
  const result = await prisma.news.findMany({
    take: quantity,
    skip: point,
    orderBy: {
      updatedAt: "desc",
    },
  });

  return result;
};

export default listNews;
