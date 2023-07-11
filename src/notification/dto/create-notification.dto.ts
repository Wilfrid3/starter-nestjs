import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
    
  @IsNotEmpty({ message: 'Message field is required.' })
  @IsString()
  message: string;

  @IsNotEmpty({ message: 'Sensor is required.' })
  @IsString()
  sensorId: string;
}
