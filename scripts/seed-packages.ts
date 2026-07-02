import "dotenv/config";
import { prisma } from "../lib/prisma";
import { PACKAGES } from "../lib/packages-data";

async function main() {
  console.log("Seeding packages to DB...");
  
  for (const pkg of PACKAGES) {
    // Check if package already exists by subtitle (tagline) or title
    const existing = await prisma.test.findFirst({
      where: { subtitle: pkg.tagline || pkg.name },
    });

    if (!existing) {
      await prisma.test.create({
        data: {
          title: pkg.name,
          subtitle: pkg.tagline || pkg.name,
          price: pkg.price,
          category: "Package",
        },
      });
      console.log(`Created package: ${pkg.name}`);
    } else {
      console.log(`Package already exists: ${pkg.name}`);
    }
  }

  console.log("Seeding complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
