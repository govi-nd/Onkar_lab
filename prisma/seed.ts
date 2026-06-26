import "dotenv/config";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
import { Role, PaymentStatus, BookingStatus } from "../lib/generated/prisma/client";

async function main() {
  console.log("Deleting old data...");

  // Delete old data (order matters because of relations)
  await prisma.payment.deleteMany();
  await prisma.bookingTest.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.test.deleteMany();
  await prisma.user.deleteMany();

  console.log("Old data deleted");

  // --------------------------------------------------
  // Create Tests
  // --------------------------------------------------
  const cbc = await prisma.test.create({
    data: {
      title: "Complete Blood Count",
      subtitle: "CBC-TEST",
      price: 350,
      category: "Blood",
    },
  });

  const lipid = await prisma.test.create({
    data: {
      title: "Lipid Profile",
      subtitle: "LIPID-TEST",
      price: 600,
      category: "Blood",
    },
  });

  const thyroid = await prisma.test.create({
    data: {
      title: "Thyroid Profile",
      subtitle: "THYROID-TEST",
      price: 800,
      category: "Hormone",
    },
  });

  console.log("Tests created");

  // --------------------------------------------------
  // Create Dummy Users
  // --------------------------------------------------
  const usersData = [
    {
      name: "Ravi Sharma",
      email: "ravi.test@example.com",
      phone: "9990000001",
    },
    {
      name: "Simran Kaur",
      email: "simran.test@example.com",
      phone: "9990000002",
    },
    {
      name: "Amit Verma",
      email: "amit.test@example.com",
      phone: "9990000003",
    },
  ];

  const hashedUserPassword = await bcrypt.hash("user123", 10);

  const users = [];

  for (const u of usersData) {
    const user = await prisma.user.create({
      data: {
        ...u,
        role: Role.USER,
        passwordHash: hashedUserPassword,
      },
    });

    users.push(user);
  }

  console.log("Dummy users created");

  // --------------------------------------------------
  // Create Admin User
  // --------------------------------------------------
  const adminPassword = await bcrypt.hash("admin123", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@onkarlabs.com",
      phone: "9990000099",
      role: Role.ADMIN,
      passwordHash: adminPassword,
    },
  });

  console.log("Admin user created");

  // --------------------------------------------------
  // Create Dummy Bookings
  // --------------------------------------------------
  const scenarios = [
    {
      user: users[0],
      paymentStatus: PaymentStatus.PENDING,
      bookingStatus: BookingStatus.BOOKED,
    },
    {
      user: users[1],
      paymentStatus: PaymentStatus.SUCCESS,
      bookingStatus: BookingStatus.SAMPLE_COLLECTED,
    },
    {
      user: users[2],
      paymentStatus: PaymentStatus.SUCCESS,
      bookingStatus: BookingStatus.REPORT_READY,
    },
  ];

  for (const s of scenarios) {
    const booking = await prisma.booking.create({
      data: {
        userId: s.user.id,
        appointmentDate: new Date(),
        slot: "10:00 AM - 11:00 AM",
        totalAmount: cbc.price + lipid.price + thyroid.price,

        paymentStatus: s.paymentStatus,
        bookingStatus: s.bookingStatus,

        tests: {
          create: [
            { testId: cbc.id },
            { testId: lipid.id },
            { testId: thyroid.id },
          ],
        },

        payment: {
          create: {
            amount: cbc.price + lipid.price + thyroid.price,
            status: s.paymentStatus,
          },
        },
      },
    });

    console.log(
      `Booking created for ${s.user.name} (${booking.id})`
    );
  }

  console.log("\n✅ Seed completed successfully\n");

  console.log("Admin Credentials:");
  console.log("Email: admin@onkarlabs.com");
  console.log("Password: admin123");

  console.log("\nUser Credentials:");
  console.log("Email: ravi.test@example.com");
  console.log("Password: user123");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });