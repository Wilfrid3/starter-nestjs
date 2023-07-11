import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose'
import { Farm } from '../../schemas/farm.schema';
import { Laboratory } from '../../laboratories/schemas/laboratory.schema';
import { Agroexpert } from '../../agro-expert/schemas/agroexpert.schema';
import { User } from 'src/schemas/user.schema';
import { Sheet } from 'src/sheet/schemas/sheet.schema';

export type DocumentsDocument = Documents & Document;

@Schema({
  timestamps: true,
})
export class Documents {

  @Prop()
  transaction: string;

  @Prop({default: 1})
  status: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Sheet' })
  sheet: Sheet
}

export const DocumentsSchema = SchemaFactory.createForClass(Documents);