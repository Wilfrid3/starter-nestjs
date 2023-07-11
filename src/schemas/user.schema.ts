import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Planning } from 'src/planning/schemas/planning.schema';
import { Store } from 'src/stores/schemas/store.schema';
import { Transaction } from 'src/transaction/schemas/transaction.schema';
import { Profil } from 'src/profil/schema/profil.schema';
import { Farm } from './farm.schema';
import { Vehicle } from 'src/vehicle/schemas/vehicle.schema';
import { Service } from './service.schema';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {

  _id: string;

  @Prop()
  name: string;

  @Prop()
  token_notif: string;

  @Prop()
  token: string;

  @Prop()
  videoId: number;

  @Prop({ unique: true })
  phone: string;

  @Prop({default: 1})
  status: number;

  @Prop({default: 0})
  solde: number;

  @Prop()
  password: string;
  
  @Prop({optional: true, default: "default-avatar.png"})
  avatar?: string;

  @Prop({ unique: true, optional: true, set: v => v.toLowerCase() })
  email?: string;

  @Prop({ optional: true, })
  pseudo: string;

  @Prop({ default: false })
  isPhoneConfirmed: boolean;

  @Prop({ default: false })
  isEmailConfirmed: boolean;

  @Prop()
  phoneConfirmedAt?: Date;

  @Prop()
  emailConfirmedAt?: Date;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Farm' }])
  farms: Farm[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Planning' }])
  plannings: Planning[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Store' }])
  stores: Store[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Vehicle' }])
  vehicles: Vehicle[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Transaction' }])
  transactions: Transaction[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Profil' }])
  profil: Profil[]

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Service' }])
  services: Service[]
}

export const UserSchema = SchemaFactory.createForClass(User);

// UserSchema.pre('save', function(next){
//   this.pseudo = `user-${Math.random().toString(36).substring(2, 9)}`
//   next();
// });
