import { prisma } from "@/lib/prisma";

const listProducts = async () => {
  const result = await prisma.product.findMany({
    orderBy: {
      sequence: "asc"
    }
  });

  return result;
};

export default listProducts;
