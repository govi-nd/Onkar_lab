import BookComponent from "@/components/book/BookComponent";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function Page() {
  const tests = await prisma.test.findMany({
    orderBy: {
      title: "asc",
    },
    select: {
      id: true,
      title: true,
      price: true,
    },
  });

  return <BookComponent tests={tests} />;
}
