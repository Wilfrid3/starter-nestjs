import { Module } from '@nestjs/common';
import { PlanningService } from './planning.service';
import { PlanningController } from './planning.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Planning, PlanningSchema } from 'src/planning/schemas/planning.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Planning.name, schema: PlanningSchema }]),
    UsersModule,
  ],
  controllers: [PlanningController],
  providers: [PlanningService],
  exports: [PlanningService],
})
export class PlanningModule {}
