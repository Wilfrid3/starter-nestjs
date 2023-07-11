import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../schemas/user.schema';
import { ItemOrder } from './item-order.schema';
import { Service } from 'src/schemas/service.schema';
import { TypeVehicle } from 'src/typevehicle/schemas/typevehicle.schema';
import { Invoice } from 'src/invoice/schemas/invoice.schema';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})

export class Order {

  _id: string;

  @Prop()
  ref: string

  @Prop()
  receiverName: string

  @Prop()
  receiverPhone: string

  @Prop()
  breakable: string

  @Prop()
  pickDate: string

  @Prop()
  pickTime: string

  @Prop({default: 1})
  status: number

  @Prop({default: 0})
  rejectAmount: Number

  @Prop({default: 0})
  reject: number

  @Prop({default: 1})
  itemsNumber: number

  @Prop({default: 0})
  invoicesNumber: number

  @Prop({default: 0})
  express: number

  @Prop()
  weight: string

  @Prop()
  from: string

  @Prop()
  to: string

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  user: User

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'ItemOrder' }])
  items: ItemOrder[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Service' })
  service: Service

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'TypeVehicle' })
  typevehicle: TypeVehicle

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Invoice' })
  invoices: Invoice[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  transporter: User
}

export const OrderSchema = SchemaFactory.createForClass(Order);