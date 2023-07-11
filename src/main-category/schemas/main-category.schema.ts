import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Category } from '../../category/schemas/category.schema';
import { Profil } from '../../profil/schema/profil.schema';

export type MainCategoryDocument = MainCategory & Document;

@Schema({
  timestamps: true,
})
export class MainCategory {
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

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Category' }])
  categories: Category[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'profil' }])
  profil: Profil[]
}

export const MainCategorySchema = SchemaFactory.createForClass(MainCategory);
