/*
  Warnings:

  - You are about to drop the column `paid` on the `Orden` table. All the data in the column will be lost.
  - You are about to drop the column `paidAt` on the `Orden` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orden" DROP COLUMN "paid",
DROP COLUMN "paidAt";

-- CreateTable
CREATE TABLE "OrdenPago" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "urlRecibo" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrdenPago_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrdenPago_orderId_key" ON "OrdenPago"("orderId");

-- AddForeignKey
ALTER TABLE "OrdenPago" ADD CONSTRAINT "OrdenPago_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orden"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
