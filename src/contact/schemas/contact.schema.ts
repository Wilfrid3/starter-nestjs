import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ContactDocument = Contact & Document;

@Schema({
  timestamps: true,
})
export class Contact {
  @Prop()
  fullname: string;

  @Prop()
  email: string;

  @Prop()
  phone: string;

  @Prop()
  message: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);