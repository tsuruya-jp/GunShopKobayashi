import getProduct from "@/features/product/api/get";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const query = req.nextUrl.searchParams.get("id") ?? "";
  const data = await getProduct(query);
  const arrayID: { [x in string]: string } = {};
  const images = await prisma.image.findMany({
    select: {
      id: true,
      urn: true,
    },
  });
  images.map((v) => {
    arrayID[v.id] = v.urn;
  });

  if (data) {
    data.image = arrayID[data.image];
    if (data.images) {
      const imageArray = [];
      for (const [key, value] of Object.entries(data.images)) {
        imageArray.push(arrayID[value]);
      }
      data.images = Object.assign({}, imageArray);
    }
  }

  return Response.json(data)
};

