import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypequipmentDocument = Typequipment & Document;

@Schema({
  timestamps: true,
})
export class Typequipment {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const TypequipmentSchema = SchemaFactory.createForClass(Typequipment);
