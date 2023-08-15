import getNews from "@/features/news/api/get";
import { NextApiRequest, NextApiResponse } from "next";

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method!.toLocaleLowerCase() !== "get") {
      return res.status(405).end();
    }
    const data = await getNews(String(req.query.id));
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).end();
  }
};

export default execute;
