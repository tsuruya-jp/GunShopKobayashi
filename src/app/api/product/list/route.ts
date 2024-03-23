import listProducts from "@/features/product/api/list";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const queryString =
    req.nextUrl.searchParams.get("condition") ?? "false,false,false,false,false,false";
  const query: boolean[] = queryString.split(",").map((v) => JSON.parse(v));
  const data = await listProducts(query);

  return Response.json(data);
};
