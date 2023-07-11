import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document, Schema as MongooseSchema } from 'mongoose';
import { Destination } from 'src/destination/schemas/destination.schema';
import { User } from 'src/schemas/user.schema';
import { Typepost } from 'src/type-post/schemas/Typepost.schema';
import { TypeVehicle } from 'src/typevehicle/schemas/typevehicle.schema';
import { Unity } from 'src/unity/schemas/unity.schema';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
})
export class Post {
  @Prop()
  image: string;

  @Prop()
  lien: string;

  @Prop()
  name: string;

  @Prop()
  postDate: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Typepost' })
  typepost: Typepost
}

export const PostSchema = SchemaFactory.createForClass(Post);
