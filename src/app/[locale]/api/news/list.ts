import listNews from "@/features/news/api/list";
import { NextApiRequest, NextApiResponse } from "next";

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method!.toLocaleLowerCase() !== 'get') {
      return res.status(405).end()
    }
    const data = await listNews(Number(req.query.take), Number(req.query.skip));
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).end();
  }
};

export default execute;
