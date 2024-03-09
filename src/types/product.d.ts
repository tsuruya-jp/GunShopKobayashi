type ProductData = {
  id: string;
  name: string;
  price: number;
  image: string;
  images?: Prisma.JsonValue;
  type: number;
  caliber: string;
  manufacturer: string;
  model: string;
  barrelLength?: Decimal;
  weight?: Decimal;
  pull?: Decimal;
  condition: number;
  remarks?: string;
  sequence?: number;
  description?: string;
};
