import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as mongoose from 'mongoose'
import { User } from '../../schemas/user.schema';
import { Range } from '../../plages/schemas/range.schema';

export type PlanningDocument = Planning & Document;

@Schema({
  timestamps: true,
})
export class Planning {

  @Prop()
  description: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Range' }])
  ranges: Range[]
}

export const PlanningSchema = SchemaFactory.createForClass(Planning);