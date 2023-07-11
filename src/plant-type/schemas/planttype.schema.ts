import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PlantTypeDocument = PlantType & Document;

@Schema({
  timestamps: true,
})
export class PlantType {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const PlantTypeSchema = SchemaFactory.createForClass(PlantType);
