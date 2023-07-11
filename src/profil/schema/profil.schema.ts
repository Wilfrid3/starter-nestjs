import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
// import * as mongoose from 'mongoose'
import { Permission } from '../../perimission/schema/permission.schema';
import { MainCategory } from '../../main-category/schemas/main-category.schema';

export type ProfilDocument = Profil & Document;

@Schema({
  timestamps: true,
})
export class Profil {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Permission' }])
  permissions: Permission[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'MainCategory' })
  category: MainCategory
}

export const ProfilSchema = SchemaFactory.createForClass(Profil);