import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Equipment } from '../../equipments/schemas/equipment.schema';
import { Data } from '../../data-equipment/schemas/data.schema';
import { Notification } from '../../notification/schemas/notification.schema';
import { TypeData } from '../../type-data/schemas/type-data.schema';

export type SensorDocument = Sensor & Document;

@Schema({
  timestamps: true,
})
export class Sensor {
  @Prop()
  name: string;

  @Prop()
  type: boolean;

  @Prop({ unique: true })
  sensorId: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Equipment' })
  device: Equipment

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Data' }])
  datas: Data[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Notification' }])
  notifications: Notification[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeData' })
  typedata: TypeData
}

export const SensorSchema = SchemaFactory.createForClass(Sensor);