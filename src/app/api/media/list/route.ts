import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const id = data.id ?? "";
    const name = data.name ?? "";
    const result = await prisma.image.findMany({
      where: {
        OR: [{ id: { contains: id } }, { name: { contains: name } }],
      },
      orderBy: {
        name: "asc",
      },
    });

    return Response.json(result);
  } catch (err) {
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
