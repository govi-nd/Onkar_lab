import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../lib/generated/prisma/client";
import { Role } from "../lib/generated/prisma/enums";

const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

const email = process.argv[2] ?? "govindbtl2005@gmail.com";

async function main() {
  const user = await prisma.user.update({
    where: {
      email,
    },
    data: {
      role: Role.ADMIN,
    },
  });

  console.log(`${user.email} is now an admin`);
}

main()
  .catch((error) => {
    if (error?.code === "P2025") {
      console.error(`No user found with email: ${email}`);
      process.exitCode = 1;
      return;
    }

    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
