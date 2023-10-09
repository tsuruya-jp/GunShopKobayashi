import { prisma } from "@/lib/prisma";

const listProducts = async (take?: number, skip?: number) => {
  const quantity = take !== 0 ? take : undefined;
  const point = skip !== 0 ? skip : undefined;
  const result = await prisma.product.findMany({
    take: quantity,
    skip: point,
  });

  return result;
};

export default listProducts;
