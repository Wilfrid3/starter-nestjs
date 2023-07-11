import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreditTransactionDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Ref field is required.' })
  @IsString()
  ref: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'User is required.' })
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Amount is required.' })
  @IsString()
  amount: string;
}
