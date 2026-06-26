/*
  Warnings:

  - The values [PENDING_PAYMENT,PROCESSING] on the enum `BookingStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookingStatus_new" AS ENUM ('BOOKED', 'SAMPLE_COLLECTED', 'REPORT_READY', 'COMPLETED', 'CANCELLED');
ALTER TABLE "public"."Booking" ALTER COLUMN "bookingStatus" DROP DEFAULT;
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" TYPE "BookingStatus_new" USING ("bookingStatus"::text::"BookingStatus_new");
ALTER TYPE "BookingStatus" RENAME TO "BookingStatus_old";
ALTER TYPE "BookingStatus_new" RENAME TO "BookingStatus";
DROP TYPE "public"."BookingStatus_old";
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'BOOKED';
COMMIT;

-- AlterTable
ALTER TABLE "Booking" ALTER COLUMN "bookingStatus" SET DEFAULT 'BOOKED';
