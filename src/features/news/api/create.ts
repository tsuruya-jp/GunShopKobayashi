import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createNews = async (req: NewsData) => {
  const result = await prisma.news.create({
    data: {
      id: req.id,
      title: req.title,
      content: req.content,
      public: req.public,
      createdAt: req.createdAt
    },
  });

  return result;
};

export default createNews;

