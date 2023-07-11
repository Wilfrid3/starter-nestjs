import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Product } from 'src/products/schemas/product.schema';

export type RecipientDocument = Recipient & Document;

@Schema({
  timestamps: true,
})
export class Recipient {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }])
  products: Product[]
}

export const RecipientSchema = SchemaFactory.createForClass(Recipient);
