import createUser from "@/features/user/api/create";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt"
import bcrypt from "bcryptjs";

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const token = await getToken({ req });
    if (!token) {
      res.status(401).end();
    } 
    const userId = crypto.randomUUID();
    const hashPass = await bcrypt.hash(req.body.pass, 10);
    const data = {
      id: userId,
      username: req.body.name,
      email: req.body.email,
      password: hashPass,
    };
    await createUser(data);
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }
};

export default execute;
