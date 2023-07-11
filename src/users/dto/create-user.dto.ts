import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
// import { IsUserAlreadyExist } from './unique-phone.validator';

export class CreateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  // @IsUserAlreadyExist({
  //   message: 'User $value already exists. Choose another phone number.'
  // })
  phone: string;
}
