import { IsNumber, IsPositive } from "class-validator"

export class ItemDto{
    @IsNumber()
    @IsPositive()
    productId:number  

     @IsNumber()
    @IsPositive()
    cantidad:number 

    @IsNumber({maxDecimalPlaces:2})
    @IsPositive()
    price:number 
}