/*
  Warnings:

  - Added the required column `stripePaymentId` to the `OrdenPago` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrdenPago" ADD COLUMN     "stripePaymentId" TEXT NOT NULL;
