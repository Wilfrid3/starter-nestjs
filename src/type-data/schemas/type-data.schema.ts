import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypeDataDocument = TypeData & Document;

@Schema({
  timestamps: true,
})
export class TypeData {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const TypeDataSchema = SchemaFactory.createForClass(TypeData);
