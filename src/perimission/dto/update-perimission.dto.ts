import { PartialType } from '@nestjs/mapped-types';
import { CreatePerimissionDto } from './create-perimission.dto';

export class UpdatePerimissionDto extends PartialType(CreatePerimissionDto) {
    
}
