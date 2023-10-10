import { prisma } from "@/lib/prisma";

const getProduct = async (name: string) => {
  const result = await prisma.product.findUnique({
    where: {
      name: name,
    },
  });

  return result;
};

export default getProduct;
