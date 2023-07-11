import { Module } from '@nestjs/common';
import { LaboratoriesService } from './laboratories.service';
import { MongooseModule } from '@nestjs/mongoose';
import { LaboratoriesController } from './laboratories.controller';
import { Laboratory, LaboratorySchema } from './schemas/laboratory.schema';
import { UsersModule } from '../users/users.module';
import { ProfilModule } from '../profil/profil.module';
import { SpecialitiesModule } from '../specialities/specialities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Laboratory.name, schema: LaboratorySchema }]),
    UsersModule,
    ProfilModule,
    SpecialitiesModule,
  ],
  controllers: [LaboratoriesController],
  providers: [LaboratoriesService],
  exports: [LaboratoriesService]
})
export class LaboratoriesModule {}
