import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Sensor } from '../../sensor/schemas/sensor.schema';

export type NotificationDocument = Notification & Document;

@Schema({
  timestamps: true,
})
export class Notification {
  @Prop()
  message: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Sensor' })
  sensor: Sensor
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);