import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const getData = async (name: string) => {
  const result = await prisma.user.findUnique({
    where: {
      username: name,
    },
  });

  return result;
};

const getUser = async (body: Credentials) => {
  try {
    const result = await getData(body.name);
    if (!result) {
      return null;
    }

    const authorize = await bcrypt.compare(body.pass, result.password);
    if (!authorize) {
      return null;
    }

    return result;
  } catch (e) {
    console.log(e);
  }
};

export default getUser;
