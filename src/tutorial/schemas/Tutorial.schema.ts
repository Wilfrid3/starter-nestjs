import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Typepost } from 'src/type-post/schemas/Typepost.schema';

export type TutorialDocument = Tutorial & Document;

@Schema({
  timestamps: true,
})
export class Tutorial {
  @Prop({ unique: true })
  name: string;

  @Prop()
  lien: string;

  @Prop()
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Typepost' })
  typepost: Typepost
}

export const TutorialSchema = SchemaFactory.createForClass(Tutorial);
