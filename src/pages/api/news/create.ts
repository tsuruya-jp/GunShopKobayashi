import create from "@/features/news/api/create"
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
      updatedAt: now
    }
    await create(data);
    res.status(200).end()
  } catch(err) {
    res.status(500).end()
  }
}

export default execute;