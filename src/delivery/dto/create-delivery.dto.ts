import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateDeliveryDto {
    
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Price field is required.' })
    @IsString()
    price: number;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Store is required.' })
    @IsString()
    store: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'City is required.' })
    @IsString()
    city: string;
}
