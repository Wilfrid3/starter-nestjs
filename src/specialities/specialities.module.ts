import { Module } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { SpecialitiesController } from './specialities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialities, SpecialitiesSchema } from './schemas/specialities.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Specialities.name, schema: SpecialitiesSchema }]),
  ],
  controllers: [SpecialitiesController],
  providers: [SpecialitiesService],
  exports: [SpecialitiesService]
})
export class SpecialitiesModule {}
