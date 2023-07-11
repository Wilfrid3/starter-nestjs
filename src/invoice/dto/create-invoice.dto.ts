import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateInvoiceDto {

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Reference is required.' })
    @IsString()
    ref: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    message: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Price is required.' })
    @IsString()
    price: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Vehicle is required.' })
    @IsString()
    vehicleId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Order is required.' })
    @IsString()
    orderId: string;
}
