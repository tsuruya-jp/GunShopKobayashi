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
    const id = await data.id;
    await prisma.news.delete({
      where: {
        id: id,
      },
    });

    return Response.json({ status: 200 });
  } catch (err) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
