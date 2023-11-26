import getProduct from "@/features/product/api/get";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const query = req.nextUrl.searchParams.get("id") ?? "";
  const data = await getProduct(query);

  return Response.json(data)
};

