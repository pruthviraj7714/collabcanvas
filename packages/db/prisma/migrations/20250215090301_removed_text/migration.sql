/*
  Warnings:

  - The values [TEXT] on the enum `SHAPE` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `text` on the `Shape` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "SHAPE_new" AS ENUM ('CIRCLE', 'RECTANGLE', 'LINE', 'TRIANGLE');
ALTER TABLE "Shape" ALTER COLUMN "type" TYPE "SHAPE_new" USING ("type"::text::"SHAPE_new");
ALTER TYPE "SHAPE" RENAME TO "SHAPE_old";
ALTER TYPE "SHAPE_new" RENAME TO "SHAPE";
DROP TYPE "SHAPE_old";
COMMIT;

-- AlterTable
ALTER TABLE "Shape" DROP COLUMN "text";
