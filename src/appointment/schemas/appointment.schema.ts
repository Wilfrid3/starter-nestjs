import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Range } from '../../plages/schemas/range.schema';
import { Laboratory } from '../../laboratories/schemas/laboratory.schema';
import { Agroexpert } from '../../agro-expert/schemas/agroexpert.schema';
import { Service } from 'src/schemas/service.schema';

export type AppointmentDocument = Appointment & Document;

@Schema({
  timestamps: true,
})

export class Appointment {
  @Prop()
  message: string;

  @Prop()
  roomName: string;

  @Prop()
  image: string;

  @Prop()
  bookDate: Date;
  
  @Prop({ default: 0 })
  etat: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Range' })
  range: Range

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Laboratory' })
  laboratory: Laboratory

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Agroexpert' })
  expert: Agroexpert

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service' })
  service: Service
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
