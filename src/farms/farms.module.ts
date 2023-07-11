import { Module } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { FarmsController } from './farms.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Farm, FarmSchema } from '../schemas/farm.schema';
import { UsersModule } from '../users/users.module';
import { ProfilModule } from '../profil/profil.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Farm.name, schema: FarmSchema }]),
    UsersModule,
    ProfilModule,
  ],
  controllers: [FarmsController],
  providers: [FarmsService],
  exports: [FarmsService],
})
export class FarmsModule {}
