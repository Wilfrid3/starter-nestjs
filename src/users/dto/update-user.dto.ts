import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    pseudo: string;

    @IsOptional()
    @IsString()
    videoId: number;

    @IsOptional()
    @IsString()
    token_notif: string;
}
