
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { error } from "console";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
  try {
    const { name, email, phone, password } = await req.json();

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        passwordHash,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
  console.error(error);

  return NextResponse.json(
    {
      error: error instanceof Error
        ? error.message
        : "Something went wrong",
    },
    { status: 500 }
  );
}
}