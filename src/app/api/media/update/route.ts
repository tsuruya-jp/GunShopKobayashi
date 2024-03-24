import { options } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

interface Obj {
  [prop: string]: any;
}

export const POST = async (req: NextRequest) => {
  try {
    const session = await getServerSession(options);
    if (session === null || session.user.id?.length === 0) {
      return Response.json({ error: "not authorized" }, { status: 401 });
    }

    const exist = await prisma.user.findUnique({
      where: {
        id: session?.user.id,
      },
    });
    if (exist === null) {
      return Response.json({ error: "not authorized" }, { status: 401 });
    }

    const data = await req.json();
    const input: Obj = {
      name: data.name,
    }
    let filename = "";
    if (data.image && data.image.indexOf("image/") >= 0) {
      const startIdx = data.image.indexOf("image/") + "image/".length;
      const endIdx = data.image.indexOf(";base64");
      const ext = data.image.substring(startIdx, endIdx);
      const mimetype = "image/" + ext;
      const base64Image = await data.image.replace(/^data:\w+\/\w+;base64,/, "");
      const imageData = Buffer.from(base64Image, "base64");
      filename = data.name + "." + ext;
      const s3 = new S3Client({
        region: "auto",
        endpoint: process.env.R2_ENDPOINT,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID ?? "",
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? "",
        },
      });

      await s3.send(
        new PutObjectCommand({
          Body: imageData,
          Bucket: process.env.R2_BUCKET,
          Key: filename,
          ContentType: mimetype,
        })
      );
      input.urn = filename;
    }

    await prisma.image.update({
      where: {
        id: data.id,
      },
      data: input,
    });

    return Response.json(input);
  } catch (err) {
    console.log(err);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
