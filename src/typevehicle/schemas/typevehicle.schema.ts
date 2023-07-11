import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypeVehicleDocument = TypeVehicle & Document;

@Schema({
  timestamps: true,
})
export class TypeVehicle {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;
}

export const TypeVehicleSchema = SchemaFactory.createForClass(TypeVehicle);
