import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      tests: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(bookings);
}
