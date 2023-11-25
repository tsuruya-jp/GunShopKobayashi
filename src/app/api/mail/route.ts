import { NextRequest, NextResponse } from "next/server";
import { createTransport } from "nodemailer"

export const POST = async (req: NextRequest, res: NextResponse) => {
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_AUTH_USER,
      pass: process.env.MAIL_AUTH_PASS
    }
  });

  const mail = await req.json();

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

  return new Response(JSON.stringify({}))
}
