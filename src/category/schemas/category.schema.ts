import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { Product } from '../../products/schemas/product.schema';
import { MainCategory } from '../../main-category/schemas/main-category.schema';

export type CategoryDocument = Category & Document;

@Schema({
  timestamps: true,
})
export class Category {
  @Prop({ unique: true })
  name: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  cycle: string;

  @Prop()
  yield: string;

  @Prop()
  place: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Product' }])
  products: Product[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MainCategory' })
  mainCategory: MainCategory
}

export const CategorySchema = SchemaFactory.createForClass(Category);
