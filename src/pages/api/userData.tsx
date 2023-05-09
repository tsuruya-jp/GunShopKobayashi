import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next'

type UserData = {
  name: string
  pass: string
}

const parseMessage = (message: NextApiRequest):UserData => {
  const name = message.body.name;
  const pass = message.body.pass;

  return (
    {name: name, pass: pass}
  )
}

const prisma = new PrismaClient()

const getUserData = async(message: UserData) => {
  const name = message.name;
  const result = await prisma.user.findUnique({
    where: {
      username: name
    }
  });

  return result;
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try{
    const message = parseMessage(req)
    const userData = await getUserData(message)
    if(!userData || userData.password != message.pass){
      throw new Error()
    }
    res.status(200).json({
      id: userData.id,
      username: userData.username,
      password: userData.password,
      accessToken: userData.accessToken,
      createdAt: userData.createdAt,
      updatedAt: userData.updatedAt
    })
  } catch(err) {
    res.status(500).json({err: 'failed to fetch data'})
  }
}

export default handler;