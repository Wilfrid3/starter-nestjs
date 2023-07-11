import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateStoreDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Name field is required.' })
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'User is required.' })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'City is required.' })
  @IsString()
  city: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Country is required.' })
  @IsString()
  country: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsInt()
  price_livraison: number;

  @ApiProperty({ required: false })
  @IsOptional()
  description?: string;
}
