import { Module } from '@nestjs/common';
import { PlagesService } from './plages.service';
import { PlagesController } from './plages.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Range, RangeSchema } from 'src/plages/schemas/range.schema';
import { Planning, PlanningSchema } from 'src/planning/schemas/planning.schema';
import { PlanningModule } from '../planning/planning.module';
import { DaysModule } from '../days/days.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Range.name, schema: RangeSchema }]),
    MongooseModule.forFeature([{ name: Planning.name, schema: PlanningSchema }]),
    PlanningModule,
    DaysModule,
  ],
  controllers: [PlagesController],
  providers: [PlagesService],
  exports: [PlagesService]
})
export class PlagesModule {}
