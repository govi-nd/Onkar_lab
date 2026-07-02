import { Suspense } from "react";
import ReviewConfirm from "@/components/book/ReviewConfirm";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const tests = await prisma.test.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
      price: true,
      category: true,
    },
  });

  return (
    <Suspense fallback={<div className="container mx-auto p-8 text-center text-muted-foreground animate-pulse">Loading summary...</div>}>
      <ReviewConfirm tests={tests} />
    </Suspense>
  );
}
