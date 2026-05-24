import { IsNumber,IsString, IsPositive } from "class-validator"

export class ItemDto{
    @IsString()
    @IsPositive()
    productId:string  

     @IsNumber()
    @IsPositive()
    cantidad:number 

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    price:number 
}