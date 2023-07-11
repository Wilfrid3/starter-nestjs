import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserInFarmDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  profileId: string

  // @IsString()
  // @IsNotEmpty()
  // userAndProfileId: string
}
