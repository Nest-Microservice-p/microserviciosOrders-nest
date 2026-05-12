/*
  Warnings:

  - You are about to drop the column `OrderId` on the `OrdenItem` table. All the data in the column will be lost.
  - You are about to drop the column `cantididad` on the `OrdenItem` table. All the data in the column will be lost.
  - Added the required column `cantidad` to the `OrdenItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrdenItem" DROP CONSTRAINT "OrdenItem_OrderId_fkey";

-- AlterTable
ALTER TABLE "OrdenItem" DROP COLUMN "OrderId",
DROP COLUMN "cantididad",
ADD COLUMN     "cantidad" INTEGER NOT NULL,
ADD COLUMN     "orderId" TEXT;

-- AddForeignKey
ALTER TABLE "OrdenItem" ADD CONSTRAINT "OrdenItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orden"("id") ON DELETE SET NULL ON UPDATE CASCADE;
