import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const getData= async(name: string) => {
  const result = await prisma.user.findUnique({
    where: {
      username: name
    }
  });

  return result;
}

const getUser = async(body: Credentials) => {
  try{
    const userData = await getData(body.name)

    return result
  } catch(e) {
    console.log(e)
  }
}

export default getUser;