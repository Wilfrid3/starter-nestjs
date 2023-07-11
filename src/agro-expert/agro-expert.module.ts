import { Module } from '@nestjs/common';
import { AgroExpertService } from './agro-expert.service';
import { AgroExpertController } from './agro-expert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Agroexpert, AgroexpertSchema } from './schemas/agroexpert.schema';
import { UsersModule } from '../users/users.module';
import { ProfilModule } from '../profil/profil.module';
import { SpecialitiesModule } from '../specialities/specialities.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Agroexpert.name, schema: AgroexpertSchema }]),
    UsersModule,
    ProfilModule,
    SpecialitiesModule,
  ],
  controllers: [AgroExpertController],
  providers: [AgroExpertService],
  exports: [AgroExpertService]
})
export class AgroExpertModule {}
