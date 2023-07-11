import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Store } from 'src/stores/schemas/store.schema';

export type DeliveryDocument = Delivery & Document;

@Schema({
  timestamps: true,
})
export class Delivery {

  @Prop()
  price: number;

  @Prop()
  city: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Store' })
  store: Store
}

export const DeliverySchema = SchemaFactory.createForClass(Delivery);
