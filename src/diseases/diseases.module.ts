import { Module } from '@nestjs/common';
import { DiseasesService } from './diseases.service';
import { DiseasesController } from './diseases.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from '../users/users.module';
import { Disease, DiseaseSchema } from './schemas/diseases.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Disease.name, schema: DiseaseSchema }]),
    UsersModule
  ],
  controllers: [DiseasesController],
  providers: [DiseasesService],
  exports: [DiseasesService]
})
export class DiseasesModule {}
