import { Module } from '@nestjs/common';
import { TypeDataService } from './type-data.service';
import { TypeDataController } from './type-data.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeData, TypeDataSchema } from 'src/type-data/schemas/type-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: TypeData.name, schema: TypeDataSchema }]),
  ],
  controllers: [TypeDataController],
  providers: [TypeDataService],
  exports: [TypeDataService]
})
export class TypeDataModule {}
