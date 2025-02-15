/*
  Warnings:

  - You are about to drop the column `thirdX` on the `Shape` table. All the data in the column will be lost.
  - You are about to drop the column `thirdY` on the `Shape` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "thirdX",
DROP COLUMN "thirdY",
ADD COLUMN     "thirdx" DOUBLE PRECISION,
ADD COLUMN     "thirdy" DOUBLE PRECISION;
