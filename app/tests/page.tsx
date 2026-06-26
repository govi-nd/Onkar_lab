import { prisma } from "@/lib/prisma";
import TestsCatalog from "@/components/tests/TestsCatalog";



export default async function Home() {
  const testDetails = await prisma.test.findMany({
    select: {
      id: true,
      title: true,
      subtitle: true,
      price: true,
      category: true,
    },
  });
  const categories = [...new Set(testDetails.map((test) => test.category))];

  return <TestsCatalog tests={testDetails} categories={categories} />;
}
