import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const adminCheck = await requireAdmin();
  if (adminCheck.error) {
    return adminCheck.error;
  }

  try {
    const users = await prisma.user.findMany({
      include: {
        bookings: {
          where: {
            OR: [
              { paymentStatus: "SUCCESS" },
              { payment: { is: { status: "SUCCESS" } } },
            ],
          },
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
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
