import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose';
import { Planning } from '../../planning/schemas/planning.schema';
import { Day } from '../../days/schemas/day.schema';

export type RangeDocument = Range & Document;

@Schema({
  timestamps: true,
})
export class Range {

  @Prop()
  start: Date;

  @Prop()
  end: Date;

  @Prop({ default: 0 })
  etat: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Planning' })
  planning: Planning

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Day' })
  day: Day
}


export const RangeSchema = SchemaFactory.createForClass(Range);