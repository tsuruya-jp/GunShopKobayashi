import createUser from "@/features/user/api/create"
import { NextApiRequest, NextApiResponse } from "next"
import bcrypt from 'bcryptjs';

const execute = async(
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try{
    const userId = crypto.randomUUID();
    const hashPass = await bcrypt.hash(req.body.pass, 10);
    const data = {
      id: userId,
      username: req.body.name,
      email: req.body.email,
      password: hashPass
    }
    const result = createUser(data);
    console.log(result);
    res.status(200).json({result})
  } catch(err) {
    res.status(500).json({err: 'failed to fetch data'})
  }
}

export default execute;