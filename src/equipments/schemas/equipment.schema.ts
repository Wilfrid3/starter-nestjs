import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Farm } from '../../schemas/farm.schema';
import { Typequipment } from '../../typequipments/schemas/typequipment.schema';
import { Sensor } from '../../sensor/schemas/sensor.schema';

export type EquipmentDocument = Equipment & Document;

@Schema({
  timestamps: true,
})
export class Equipment {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  location: string;

  @Prop()
  coordinate: string;

  @Prop()
  deviceId: string;

  @Prop()
  phone: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Farm' })
  farm: Farm

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Typequipment' })
  typequipment: Typequipment

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Sensor' }])
  sensors: Sensor[]
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);