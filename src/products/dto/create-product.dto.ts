import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProductDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User is required.' })
    @IsString()
    userId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Recipient is required.' })
    @IsString()
    recipientId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Category is required.' })
    @IsString()
    categoryId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Store is required.' })
    @IsString()
    store: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Unity is required.' })
    @IsString()
    unityId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Currency is required.' })
    @IsString()
    currencyId: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Price is required.' })
    @IsString()
    price: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image1: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image2: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    image3: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    minQte: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    totalQte: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    rate_germination?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    place?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    yield?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    cycle?: string;
  
    @ApiProperty({ required: false })
    @IsOptional()
    color?: string;
}
