import listNews from "@/features/news/api/list";
import { NextApiRequest, NextApiResponse } from "next";

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method!.toLocaleLowerCase() !== 'get') {
      return res.status(405).end()
    }
    const article = Number(req.query.article);
    const data = await listNews(article);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).end();
  }
};

export default execute;
