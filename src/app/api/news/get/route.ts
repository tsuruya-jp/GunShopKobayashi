import getNews from "@/features/news/api/get";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest)  {
  const queryString = req.nextUrl.searchParams.get("id") ?? "";
  const data = await getNews(queryString);

  return Response.json(data)
};