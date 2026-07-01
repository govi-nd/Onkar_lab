import { Suspense } from "react";
import BookComponent from "@/components/book/BookComponent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function BookPage() {
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
    <Suspense fallback={<div className="container mx-auto p-8 text-center text-muted-foreground animate-pulse">Loading booking system...</div>}>
      <BookComponent tests={tests} />
    </Suspense>
  );
}
