-- CreateEnum
CREATE TYPE "SHAPE" AS ENUM ('CIRCLE', 'RECTANGLE', 'LINE', 'TRIANGLE', 'TEXT');

-- CreateTable
CREATE TABLE "Shape" (
    "id" TEXT NOT NULL,
    "type" "SHAPE" NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "width" DOUBLE PRECISION,
    "height" DOUBLE PRECISION,
    "radius" DOUBLE PRECISION,
    "strokeColor" TEXT,
    "fillColor" TEXT,
    "roomId" TEXT NOT NULL,

    CONSTRAINT "Shape_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Shape" ADD CONSTRAINT "Shape_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
