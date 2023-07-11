import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Sensor } from '../../sensor/schemas/sensor.schema';

export type DataDocument = Data & Document;

@Schema({
  timestamps: true,
})
export class Data {

  @Prop()
  data: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Sensor' })
  sensor: Sensor
}

export const DataSchema = SchemaFactory.createForClass(Data);