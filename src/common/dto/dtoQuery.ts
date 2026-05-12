import { EstadosOrden } from "@prisma/client"
import { Type } from "class-transformer"
import { IsEnum, IsOptional, IsPositive } from "class-validator"
import { listEstados } from "src/ordenes/dto/estadOrden.dto"



export class queryPaginator{

  @IsOptional()
    @IsEnum(listEstados,{
        message:`El estado debe ser igual a los siguientes: ${listEstados}`
    })
    estado: EstadosOrden
    

    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    paginator:number=1

    @IsOptional()
    @IsPositive()
    @Type(()=>Number)
    limit:number=10
}

