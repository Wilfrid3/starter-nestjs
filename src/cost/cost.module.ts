import { Module } from '@nestjs/common';
import { CostService } from './cost.service';
import { CostController } from './cost.controller';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { DestinationModule } from 'src/destination/destination.module';
import { Cost, CostSchema } from './schemas/cost.schema';
import { TypevehicleModule } from 'src/typevehicle/typevehicle.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cost.name, schema: CostSchema }]),
    UsersModule,
    DestinationModule,
    TypevehicleModule
  ],
  controllers: [CostController],
  providers: [CostService],
  exports: [CostService]
})
export class CostModule {}
