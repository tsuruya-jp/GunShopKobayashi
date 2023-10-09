import create from "@/features/product/api/create"
import { NextApiRequest, NextApiResponse } from "next"

const execute = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try{
    const id = crypto.randomUUID();
    const data = {
      id: id.replaceAll("-", ""),
      name: req.body.name,
      price: req.body.price,
      image: req.body.image,
      images: req.body.images,
      type: req.body.type,
      caliber: req.body.caliber,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      barrelLength: req.body.barrelLength,
      weight: req.body.weight,
      pull: req.body.pull,
      condition: req.body.condition,
      remarks: req.body.remarks,
    }
    const response = await create(data);
    res.status(200).end()
  } catch(err) {
    console.log(err);
    res.status(500).end()
  }
}

export default execute;