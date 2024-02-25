import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const data = await req.json();
  const id = await data.id;

  await prisma.news.delete({
    where: {
      id: id
    }
  });

  return Response.json(JSON.stringify({}));
};
