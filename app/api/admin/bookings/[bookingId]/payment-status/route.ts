import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin";

export async function PATCH() {
  const adminCheck = await requireAdmin();
  if (adminCheck.error) {
    return adminCheck.error;
  }

  return NextResponse.json(
    { message: "Payment status is managed automatically" },
    { status: 405 }
  );
}
