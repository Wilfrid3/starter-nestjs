import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ServicesService } from 'src/services/services.service';
import { UsersService } from 'src/users/users.service';
import { Model } from 'mongoose';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { Subscription, SubscriptionDocument } from './schemas/subscription.schema';
import { Transaction, TransactionDocument } from 'src/transaction/schemas/transaction.schema';
import { PacksService } from 'src/packs/packs.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { Billing, BillingDocument } from './schemas/billing.schema';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectModel(Subscription.name) private subscriptionModel: Model<SubscriptionDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    @InjectModel(Billing.name) private billingModel: Model<BillingDocument>,
    private readonly usersService: UsersService,
    private readonly packService: PacksService
  ) { }

  async billing(createBillingDto: CreateBillingDto){
    const cout = 1;
    const user = await this.usersService.findById(createBillingDto.userId);
    const subscription = await this.findSubscription(user._id);
    const billing = new this.billingModel(createBillingDto)
    billing.user = user._id;
    billing.subscription = subscription[0]._id;
    billing.credit = cout;
    billing.rest = subscription[0].credit - cout;
    billing.initialcredit = subscription[0].credit;
    billing.type = "Disease Detection";
    await billing.save();
    
    const subscript = await this.findById(subscription[0]._id);
    subscript.credit -=1;
    await subscript.save();

    return {
      status: "success",
      message: "Billing successfully.",
      data: billing,
    }
  }

  async create(createSubscriptionDto: CreateSubscriptionDto) {
    const user = await this.usersService.findById(createSubscriptionDto.user);
    const pack = await this.packService.findById(createSubscriptionDto.pack);
    const subscription = new this.subscriptionModel(createSubscriptionDto)
    subscription.user = user._id
    subscription.pack = pack._id
    const date = new Date();
    if(pack.period == "Day"){
      date.setDate(date.getDate() + pack.numberPeriod);
    }else if(pack.period == "Month"){
      date.setMonth(date.getMonth() + pack.numberPeriod);
    }else if(pack.period == "Year"){
      date.setFullYear(date.getFullYear() + pack.numberPeriod);
    }
    subscription.period = pack.period
    subscription.credit = pack.credit
    subscription.amount = pack.price
    subscription.end = date
    await subscription.save();

    console.log({ subscription: subscription._id, status: 1, ref: createSubscriptionDto.transaction, user: user._id, amount: subscription.amount, libelle: "Subscription to Pack "+pack.libelle });
    const transaction = new this.transactionModel({ subscription: subscription._id, type: 2, status: 1, ref: createSubscriptionDto.transaction, user: user._id, amount: subscription.amount, libelle: "Subscription to Pack "+pack.libelle });
    await transaction.save();

    return {
      status: "success",
      message: "Subscription successfully created.",
      data: subscription,
    }
  }

  async findById(id: string) {
    const subscription = await this.subscriptionModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSubscriptionById error', err)
      });

    if(!subscription){
      throw new HttpException('Subscription Not found 56', HttpStatus.NOT_FOUND);
    }

    return subscription;
  }

  async findSubscription(id: string) {
    const cutoff = new Date();
    const subscription = await this.subscriptionModel.find({ $and: [{'user': { $in: id }}, {'end': {$gt: cutoff}}, {'status': {$in: 2}}, {'credit': {$gte: 1}}] }).sort({ 'createdAt': 1 }).limit(1).populate(['user', 'pack'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSubscriptionsByUser error', err)
      });
    
    if(!subscription){
      throw new HttpException('Subscription Not found', HttpStatus.NOT_FOUND);
    }

    return subscription;
  }

  async findAllByUser(id: string) {
    const cutoff = new Date();
    const subcriptions = await this.subscriptionModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'pack'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSubscriptionsByUser error', err)
      });

    return {
      status: "success",
      data: subcriptions,
    }
  }

  async findByUser(id: string) {
    const cutoff = new Date();
    const subcriptions = await this.subscriptionModel.find({ $and: [{'user': { $in: id }}, {'end': {$gt: cutoff}}, {'status': {$in: 2}}, {'credit': {$gte: 1}}] }).sort({ 'createdAt': -1 }).populate(['user', 'pack'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSubscriptionsByUser error', err)
      });

    return {
      status: "success",
      data: subcriptions,
    }
  }

  async confirmedSubscription(id: string) {
    const transaction = await this.transactionModel.findOne({ 'ref': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }
    transaction.status = 2;
    transaction.save();

    const subscription = await this.subscriptionModel.findOne({ 'transaction': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getsubscriptionByOrder error', err)
      });

    if (!subscription) {
      throw new HttpException('subscription Not found', HttpStatus.NOT_FOUND);
    }
    subscription.status = 2;
    subscription.save();

    return {
      status: 'success',
      message: `Subscription successfully confirmed.`,
      data: subscription,
    }
  }

  findAll() {
    return `This action returns all subscription`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subscription`;
  }

  update(id: number, updateSubscriptionDto: UpdateSubscriptionDto) {
    return `This action updates a #${id} subscription`;
  }

  remove(id: number) {
    return `This action removes a #${id} subscription`;
  }
}
