import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
    const id = req.url.split("/")[4];
    try {
        const existingLink = await prisma.uRLShorts.findUnique({
            where: { slug: id },
        });
        if (existingLink && existingLink.slug) {
            return NextResponse.json({ data:existingLink }, { status: 200 });
        }
        return NextResponse.json({ message: "Not Found" }, { status: 404 });

    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });

    }
}