import { PartialType } from '@nestjs/mapped-types';
import { CreateAgroExpertDto } from './create-agro-expert.dto';

export class UpdateAgroExpertDto extends PartialType(CreateAgroExpertDto) {}
