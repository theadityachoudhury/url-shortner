import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json("Missing The URL", { status: 404 })
    }

    try {
      const existingLink = await prisma.uRLShorts.findUnique({
        where: { url: url },
      });

      if (existingLink) {
        return NextResponse.json({ slug: existingLink.slug }, { status: 200 })
      }

      let slug: string;
      do {
        slug = Math.random().toString(36).substring(2, 8);
      } while (await prisma.uRLShorts.findUnique({ where: { slug:slug } }));

      const newLink = await prisma.uRLShorts.create({
        data: {
          url:url,
          slug:slug,
        },
        
      });

      return NextResponse.json({ slug: newLink.slug }, {status:201});
    } catch (error) {
      console.error(error);
      return NextResponse.json({ message:"Internal Server Error" }, {status:500});
    }



  } catch (error) {
    return NextResponse.json({message:"Send correct data"}, { status: 404, statusText: "No Data" })
  }

}