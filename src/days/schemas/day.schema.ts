import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DayDocument = Day & Document;

@Schema({
  timestamps: true,
})
export class Day {
  @Prop({ unique: true })
  name: string;
}

export const DaySchema = SchemaFactory.createForClass(Day);
