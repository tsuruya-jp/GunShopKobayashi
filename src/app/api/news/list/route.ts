import countNews from "@/features/news/api/count";
import listNews from "@/features/news/api/list";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest)  {
  const queryString = req.nextUrl.searchParams;
  const query = queryString.get("query") ?? "";
  const currentPage = () => {
    if (Number(query) < 1) {
      return 1;
    }
    return Number(query);
  };
  const offset = (currentPage() - 1) * 10;
  const data = await listNews(10, offset);
  const news: NewsData[] = await JSON.parse(JSON.stringify(data));
  const count = await countNews();

  return Response.json({
    data: news,
    pagination: {
      count: count,
      currentPage: currentPage(),
    },
  })
};