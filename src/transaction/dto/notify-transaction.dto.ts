import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NotifyTransactionDto {
    
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'Ref field is required.' })
  @IsString()
  cpm_trans_id: string;
    
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  orderId: string;
    
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  appointmentId: string;
    
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  cpm_site_id: string;
}
