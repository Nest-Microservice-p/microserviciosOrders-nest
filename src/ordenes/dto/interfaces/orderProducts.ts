import { EstadosOrden } from "@prisma/client";


export interface orderProducts{
    ordenItem: {
        nombreProducto: any;
        productId: number;
        cantidad: number;
        price: number;
    }[];
    id: string;
    costoTotal: number;
    objetosTotales: number;
    estado: EstadosOrden;
    paid: boolean;
    paidAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}