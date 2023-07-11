import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsArray, ArrayMaxSize } from 'class-validator';

export class CreateOrderDto {

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Ref is required.' })
    @IsString()
    ref: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    receiverName: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    receiverPhone: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    serviceId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    typevehicleId: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    breakable: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    pickDate: string;

    @ApiProperty({ required: true })
    @IsNotEmpty()
    @IsString()
    pickTime: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Number of item is required.' })
    @IsString()
    itemsNumber: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Weight is required.' })
    @IsString()
    weight: string;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    items: string

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'From Destination is required.' })
    @IsString()
    from: string

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Express is required.' })
    @IsString()
    express: string

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'To Destination is required.' })
    @IsString()
    to: string
}
