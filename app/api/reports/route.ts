import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401 }
    );
  }

  const userData = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    include: {
      bookings: {
        include: {
          tests: {
            include: {
              test: true,
            },
          },
          payment: true,
          report: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return NextResponse.json(userData);
}
