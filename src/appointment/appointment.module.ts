import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Appointment, AppointmentSchema } from './schemas/appointment.schema';
import { Transaction, TransactionSchema } from '../transaction/schemas/transaction.schema';
import { UsersModule } from '../users/users.module';
import { PlagesModule } from '../plages/plages.module';
import { LaboratoriesModule } from '../laboratories/laboratories.module';
import { AgroExpertModule } from 'src/agro-expert/agro-expert.module';
import { ServicesModule } from 'src/services/services.module';
import { DaysModule } from 'src/days/days.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Appointment.name, schema: AppointmentSchema }, { name: Transaction.name, schema: TransactionSchema }]),
    UsersModule,
    PlagesModule,
    LaboratoriesModule,
    AgroExpertModule,
    ServicesModule,
    DaysModule,
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService],
  exports: [AppointmentService]
})
export class AppointmentModule {}
