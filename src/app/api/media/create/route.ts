import { options } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

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
    let filename = "";
    if (data.image) {
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
    }

    const id = randomUUID();
    const input = {
      id: id.replaceAll("-", ""),
      name: data.name,
      urn: filename,
    };

    await prisma.image.create({
      data: input,
    });

    return Response.json(input);
  } catch (err) {
    console.log(err);
    return Response.json({ error: "internal server error" }, { status: 500 });
  }
};
