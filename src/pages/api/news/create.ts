import createNews from "@/features/news/api/create"
import { NextApiRequest, NextApiResponse } from "next"

const execute = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try{
    const newsId = crypto.randomUUID();
    const now = new Date();
    const data = {
      id: newsId,
      title: req.body.title,
      content: req.body.content,
      public: req.body.public,
      createdAt: now,
      updatedeAt: now
    }
    const result = await createNews(data);
    res.status(200).json({result})
  } catch(err) {
    res.status(500).json({err: 'failed to fetch data'})
  }
}

export default execute;