import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';

export type DiseaseDocument = Disease & Document;

@Schema({
  timestamps: true,
})
export class Disease {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  precaution: string;

  @Prop()
  image: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
  user: User[]
}

export const DiseaseSchema = SchemaFactory.createForClass(Disease);