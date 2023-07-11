import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateBillingDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'User field is required.' })
    @IsString()
    userId: string;
}
