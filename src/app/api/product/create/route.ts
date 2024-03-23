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

    const data: ProductData = await req.json();
    const id = randomUUID();

    const input = {
      id: id.replaceAll("-", ""),
      name: data.name,
      caliber: data.caliber,
      manufacturer: data.manufacturer,
      model: data.model,
      barrelLength: data.barrelLength !== 0 ? data.barrelLength : null,
      weight: data.weight !== 0 ? data.weight : null,
      pull: data.pull !== 0 ? data.pull : null,
      remarks: data.remarks,
      description: data.description,
      image: data.image,
      images: data.images,
      price: data.price,
      type: data.type,
      condition: data.condition,
    };

    await prisma.product.create({
      data: input,
    });

    return Response.json(input);
  } catch (err) {
    console.log(err);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
