import { prisma } from "@/lib/prisma";

const countNews = async () => {
  const result = await prisma.news.count();

  return result;
};

export default countNews;
