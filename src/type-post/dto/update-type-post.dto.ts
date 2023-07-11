import { PartialType } from '@nestjs/swagger';
import { CreateTypePostDto } from './create-type-post.dto';

export class UpdateTypePostDto extends PartialType(CreateTypePostDto) {}
