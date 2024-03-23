import { options } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { randomUUID } from "crypto";
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
    const id = randomUUID();
    const input = {
      id: id.replaceAll("-", ""),
      name: data.name,
      urn: data.urn,
    };
    console.log(data.image);

    // await prisma.image.create({
    //   data: input,
    // });

    // return Response.json(input);
    return Response.json({});
  } catch (err) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
