/*
  Warnings:

  - The `amount` column on the `Package` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `ratings` column on the `Package` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Package" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL DEFAULT 0,
DROP COLUMN "ratings",
ADD COLUMN     "ratings" DOUBLE PRECISION NOT NULL DEFAULT 0;
