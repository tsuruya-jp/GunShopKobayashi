import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const date = new Date();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const id = `${date.getFullYear()}-${month}-${day}_${data.title}`;
  const input = {
    id: id,
    title: data.title,
    content: data.content,
    public: data.public,
    updatedAt: date,
    createdAt: date,
  };

  await prisma.news.create({
    data: input,
  });

  return Response.json(JSON.stringify(input));
};
