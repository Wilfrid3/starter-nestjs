import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Ref field is required.' })
  @IsString()
  ref: string;
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Libelle field is required.' })
  @IsString()
  libelle: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'User is required.' })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Order is required.' })
  @IsString()
  orderId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Country is required.' })
  @IsInt()
  amount: Number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsInt()
  status: Number;
}
