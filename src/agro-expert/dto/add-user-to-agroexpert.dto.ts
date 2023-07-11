import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class AddUserToAgroexpertDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  profileId: string

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  userId: string
}
