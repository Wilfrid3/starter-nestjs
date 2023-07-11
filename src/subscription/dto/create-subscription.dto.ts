import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateSubscriptionDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User field is required.' })
    @IsString()
    user: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Pack is required.' })
    @IsString()
    pack: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Transaction id is required.' })
    @IsString() 
    transaction: string;
  
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Number id is required.' })
    @IsString()
    numofperiod: string;
}
