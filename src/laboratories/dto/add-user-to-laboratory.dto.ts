import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AddUserToLaboratoryDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  profileId: string

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  userId: string
}
