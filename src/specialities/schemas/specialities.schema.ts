import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type SpecialitiesDocument = Specialities & Document;

@Schema({
  timestamps: true,
})
export class Specialities {
  @Prop({ unique: true })
  @Prop()
  libelle: string;

  @Prop()
  description: string;
}

export const SpecialitiesSchema = SchemaFactory.createForClass(Specialities);
