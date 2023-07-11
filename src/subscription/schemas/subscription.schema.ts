import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Pack } from 'src/packs/schemas/pack.schema';

export type SubscriptionDocument = Subscription & Document;

@Schema({
  timestamps: true,
})
export class Subscription {

  @Prop()
  end: Date;

  @Prop({default: 1})
  status: number;

  @Prop()
  transaction: string;

  @Prop()
  amount: number;

  @Prop()
  credit: number;

  @Prop()
  numofperiod: string;

  @Prop()
  period: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Pack' })
  pack: Pack
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);