import { options } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(options);
    if (session === null || session.user.id?.length === 0) {
      return Response.json({ error: "not authorized" }, { status: 401 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });
    if (exist === null) {
      return Response.json({ error: "not authorized" }, { status: 401 });
    }

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

    return Response.json(input);
  } catch(err) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
