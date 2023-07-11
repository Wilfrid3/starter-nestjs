import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsArray, IsOptional, IsString } from 'class-validator';

export class CreateProfilDto {
    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Name field is required.' })
    @IsString()
    name: string;

    @ApiProperty({ required: true })
    @IsNotEmpty({ message: 'Permissions id is required.' })
    @IsString()
    permissionId: string;

    @ApiProperty({ required: false })
    @IsOptional()
    description?: string;
}
