import { Module } from '@nestjs/common';
import { DaysService } from './days.service';
import { DaysController } from './days.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Day, DaySchema } from 'src/days/schemas/day.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Day.name, schema: DaySchema }]),
  ],
  controllers: [DaysController],
  providers: [DaysService],
  exports: [DaysService]
})
export class DaysModule {}
