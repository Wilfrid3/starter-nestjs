import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';

export type UnityDocument = Unity & Document;

@Schema({
  timestamps: true,
})
export class Unity {
  @Prop({ unique: true })
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }])
  products: Product[]
}

export const UnitySchema = SchemaFactory.createForClass(Unity);
