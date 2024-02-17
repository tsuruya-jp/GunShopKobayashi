import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const date = new Date();
  const input = {
    title: data.title,
    content: data.content,
    public: data.public,
    updatedAt: date,
  };

  await prisma.news.update({
    where: {
      id: data.id
    },
    data: input,
  });

  return Response.json(JSON.stringify(input));
};
