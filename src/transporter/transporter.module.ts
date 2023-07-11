import { Module } from '@nestjs/common';
import { TransporterService } from './transporter.service';
import { TransporterController } from './transporter.controller';
import { UsersModule } from 'src/users/users.module';
import { ProfilModule } from 'src/profil/profil.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Transporter, TransporterSchema } from './schemas/transporter.schema';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Transporter.name, schema: TransporterSchema }]),
    UsersModule,
    ProfilModule,
    VehicleModule
  ],
  controllers: [TransporterController],
  providers: [TransporterService],
  exports: [TransporterService]
})
export class TransporterModule {}
