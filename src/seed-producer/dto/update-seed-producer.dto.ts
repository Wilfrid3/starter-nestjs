import { PartialType } from '@nestjs/swagger';
import { CreateSeedProducerDto } from './create-seed-producer.dto';

export class UpdateSeedProducerDto extends PartialType(CreateSeedProducerDto) {}
