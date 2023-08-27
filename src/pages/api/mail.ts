import { NextApiRequest, NextApiResponse } from "next";
import { createTransport } from "nodemailer"

const execute = async (req: NextApiRequest, res: NextApiResponse) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS
    }
  });

  const mail = JSON.parse(req.body);

  await transporter.sendMail({
    from: `"Kobayashi Gun Shop" <no-reply@example.com>`,
    to: mail.email,
    subject: "以下の内容でお問い合わせを受け付けました",
    text: `
    名前
    ${mail.lastName} ${mail.firstName}

    メールアドレス
    ${mail.email}

    お問い合わせ内容
    ${mail.message}
    `,
  })

  res.status(200).json({
    success: true
  })
}

export default execute;