type ProductData = {
  id: string;
  name: string;
  price: string;
  image: string;
  images?: Prisma.JsonValue;
  type: string;
  caliber: string;
  manufacturer: string;
  model: string;
  barrelLength: Decimal;
  weight: Decimal;
  pull: Decimal;
  condition: string;
  remarks: string;
};