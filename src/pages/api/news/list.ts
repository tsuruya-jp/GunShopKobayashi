import listNews from "@/features/news/api/list";
import { NextApiRequest, NextApiResponse } from "next";

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await listNews();
    res.status(200).json({ result });
  } catch (err) {
    res.status(500).json({ err: "failed to fetch data" });
  }
};

export default execute;
