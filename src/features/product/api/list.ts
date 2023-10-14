import { prisma } from "@/lib/prisma";

const listProducts = async (conditions: boolean[]) => {
  let conditionType = {};

  let gunType = [];

  if (conditions[0] && !conditions[1]) {
    conditionType = { condition: 0 };
  } else if (!conditions[0] && conditions[1]) {
    conditionType = { condition: 1 };
  }

  conditions[2] ? gunType.push({ type: 0 }) : {};
  conditions[3] ? gunType.push({ type: 1 }) : {};
  conditions[4] ? gunType.push({ type: 2 }) : {};
  conditions[5] ? gunType.push({ type: 3 }) : {};
  gunType.length ? gunType : gunType.push({ type: 0 }, { type: 1 }, { type: 2 }, { type: 3 });

  const result = await prisma.product.findMany({
    where: {
      ...conditionType,
      OR: [...gunType],
    },
    orderBy: {
      sequence: "asc",
    },
  });

  return result;
};

export default listProducts;
