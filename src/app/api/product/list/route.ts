import listProducts from "@/features/product/api/list";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const queryString =
    req.nextUrl.searchParams.get("condition") ?? "false,false,false,false,false,false";
  const arrayID: { [x in string]: string } = {};
  const query: boolean[] = queryString.split(",").map((v) => JSON.parse(v));
  const data = await listProducts(query);
  const images = await prisma.image.findMany({
    select: {
      id: true,
      urn: true,
    },
  });
  images.map((v) => {
    arrayID[v.id] = v.urn;
  });

  data.map((v) => {
    v.image = arrayID[v.image];
    if (v.images) {
      const imageArray = [];
      for (const [key, value] of Object.entries(v.images)) {
        imageArray.push(arrayID[value]);
      }
      v.images = Object.assign({}, imageArray);
    }
  });

  return Response.json(data);
};
