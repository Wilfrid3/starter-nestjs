import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TypepostDocument = Typepost & Document;

@Schema({
  timestamps: true,
})
export class Typepost {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;
}

export const TypepostSchema = SchemaFactory.createForClass(Typepost);
