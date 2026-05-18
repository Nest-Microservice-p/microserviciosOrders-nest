import { EstadosOrden } from "@prisma/client";
import { IsString, IsUUID } from "class-validator";


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
    createdAt: Date;
    updatedAt: Date;
}


export class paidOrden{
    @IsString()
    @IsUUID()
    orderId: string

    @IsString()
    idPaymentStripe: string

    @IsString()
    urlStripe: string 
}