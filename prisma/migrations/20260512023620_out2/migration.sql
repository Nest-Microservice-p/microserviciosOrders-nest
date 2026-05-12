-- CreateTable
CREATE TABLE "OrdenItem" (
    "id" TEXT NOT NULL,
    "productId" INTEGER NOT NULL,
    "cantididad" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "OrderId" TEXT,

    CONSTRAINT "OrdenItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "OrdenItem" ADD CONSTRAINT "OrdenItem_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Orden"("id") ON DELETE SET NULL ON UPDATE CASCADE;
