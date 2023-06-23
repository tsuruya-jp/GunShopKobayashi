import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const createUser = async (req: UserData) => {
  const result = await prisma.user.create({
    data: {
      id: req.id,
      username: req.username,
      email: req.email,
      password: req.password,
    },
  });

  return result;
};

export default createUser;
