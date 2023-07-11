import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class RemoveUserFromFarmDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'User id is required.' })
  @IsString()
  userId: string;
}