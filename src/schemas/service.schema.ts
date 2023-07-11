import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from './user.schema';

export type ServiceDocument = Service & Document;

@Schema({
  timestamps: true,
})
export class Service {

  _id: string;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  icon: string;
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
