import { PartialType } from '@nestjs/swagger';
import { CreateTypevehicleDto } from './create-typevehicle.dto';

export class UpdateTypevehicleDto extends PartialType(CreateTypevehicleDto) {}
