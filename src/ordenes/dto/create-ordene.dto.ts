import { ArrayMinSize, IsArray, ValidateNested } from "class-validator"
import { Type } from "class-transformer"
import { ItemDto } from "./Item.dto"

export class CreateOrdeneDto{

   /*  @IsNumber()
    @IsPositive()
    costoTotal:number 
    
    @IsNumber()
    @IsPositive()
    objetosTotales:number 

    
    @IsBoolean()
    @IsOptional()
    paid:boolean */

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true})
    @Type(()=>ItemDto)
    Items:ItemDto[]=[]
}
