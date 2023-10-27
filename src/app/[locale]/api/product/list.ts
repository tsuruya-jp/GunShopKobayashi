import listProducts from "@/features/product/api/list";
import { NextApiRequest, NextApiResponse } from "next";

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method!.toLocaleLowerCase() !== "post") {
      return res.status(405).end();
    }
    const data = await listProducts(req.body.condition);
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).end();
  }
};

export default execute;
