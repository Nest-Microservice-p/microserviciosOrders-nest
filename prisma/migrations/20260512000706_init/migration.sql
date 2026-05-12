-- CreateEnum
CREATE TYPE "EstadosOrden" AS ENUM ('PENDIENTE', 'ENTREGADA', 'PAGADA', 'CANCELADA');

-- CreateTable
CREATE TABLE "Orden" (
    "id" TEXT NOT NULL,
    "costoTotal" DOUBLE PRECISION NOT NULL,
    "objetosTotales" INTEGER NOT NULL,
    "estado" "EstadosOrden" NOT NULL DEFAULT 'PENDIENTE',
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Orden_pkey" PRIMARY KEY ("id")
);
