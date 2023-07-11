import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { IsUserAlreadyExist } from './unique-phone.validator';

export class AddServiceDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  serviceId: string;
}
