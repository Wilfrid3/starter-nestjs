import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose'
import { Farm } from '../../schemas/farm.schema';
import { Laboratory } from '../../laboratories/schemas/laboratory.schema';
import { Agroexpert } from '../../agro-expert/schemas/agroexpert.schema';

export type SheetDocument = Sheet & Document;

@Schema({
  timestamps: true,
})
export class Sheet {
  @Prop()
  title: string;

  @Prop({default: 0})
  price: number;

  @Prop()
  document: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Laboratory' })
  laboratory: Laboratory

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Agroexpert' })
  expert: Agroexpert
}

export const SheetSchema = SchemaFactory.createForClass(Sheet);