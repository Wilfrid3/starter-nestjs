import { PartialType } from '@nestjs/mapped-types';
import { CreatePlageDto } from './create-plage.dto';

export class UpdatePlageDto extends PartialType(CreatePlageDto) {}
