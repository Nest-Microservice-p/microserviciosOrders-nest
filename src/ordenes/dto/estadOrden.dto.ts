import { EstadosOrden } from "@prisma/client";
import { IsEnum, IsOptional } from "class-validator";
export const listEstados=[EstadosOrden.CANCELADA,EstadosOrden.ENTREGADA,EstadosOrden.PAGADA,EstadosOrden.PENDIENTE]



export class EstadoOrden{
    @IsEnum(listEstados,{
            message:`El estado debe ser igual a los siguientes: ${listEstados}`
        })
        @IsOptional()
        estado:EstadosOrden=EstadosOrden.PENDIENTE
}