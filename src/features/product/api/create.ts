import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const createUser = async (req: ProductData) => {
  const result = await prisma.product.create({
    data: {
      id: req.id,
      name: req.name,
      price: req.price,
      image: req.image,
      images: req.images ?? Prisma.DbNull,
      type: req.type,
      caliber: req.caliber,
      manufacturer: req.manufacturer,
      model: req.model,
      barrelLength: req.barrelLength ?? null,
      weight: req.weight ?? null,
      pull: req.pull ?? null,
      condition: req.condition,
      remarks: req.remarks ?? null,
      sequence: req.sequence ?? null,
      description: req.description ?? null
    },
  });

  return result;
};

export default createUser;
