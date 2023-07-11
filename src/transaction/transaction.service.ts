import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { NotifyTransactionDto } from './dto/notify-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schemas/transaction.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { OrderService } from '../order/order.service';
import { AppointmentService } from '../appointment/appointment.service';
import { CreditTransactionDto } from './dto/credit-transaction.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
    private readonly appointmentService: AppointmentService
  ) { }

  async create(createTransactionDto: CreateTransactionDto) {
    const user = await this.usersService.findById(createTransactionDto.userId);
    const order = await this.orderService.findById(createTransactionDto.orderId);
    const transaction = new this.transactionModel(createTransactionDto)
    transaction.user = user._id
    transaction.order = order._id
    await transaction.save();

    user.transactions.push(transaction._id);
    user.save();

    return {
      status: "success",
      message: "Transaction successfully created.",
      data: transaction,
    }
  }

  async creditAccount(creditTransactionDto: CreditTransactionDto) {
    if(parseInt(creditTransactionDto.amount) < 5000){
      return {
        status: "error",
        message: "You cannot credit your account less than 5000XAF.",
        data: null,
      }
    }
    const user = await this.usersService.findById(creditTransactionDto.userId);
    const transaction = new this.transactionModel(creditTransactionDto)
    transaction.user = user._id;
    transaction.libelle = "Credit kaya account";
    transaction.status = 1;
    transaction.type = 0;
    await transaction.save();

    user.solde = user.solde + parseInt(creditTransactionDto.amount);

    user.transactions.push(transaction._id);
    user.save();

    return {
      status: "success",
      message: "Transaction successfully created.",
      data: transaction,
    }
  }

  async notifyPayment(notifyTransactionDto: NotifyTransactionDto) {
    await this.transactionModel.updateOne({ ref: notifyTransactionDto.cpm_trans_id }, {
      status: 2
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })
    if (notifyTransactionDto.orderId) {
      const order = await this.orderService.findById(notifyTransactionDto.orderId);
      order.status = 2;
      order.save();
    }
    if (notifyTransactionDto.appointmentId) {
      const appointment = await this.appointmentService.findById(notifyTransactionDto.appointmentId);
      appointment.etat = 1;
      appointment.save();
    }

    return {
      status: "success",
    }
  }

  async findAll() {
    const transactions = await this.transactionModel.find().sort({ 'createdAt': -1 }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
        populate: {
          path: 'product',
        },
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionsByUser error', err)
      });

    return {
      status: "success",
      data: transactions,
    }
  }

  async findByOrder(order: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: order } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }

    return transaction;
  }

  async findByRef(ref: string) {
    const transactions = await this.transactionModel.findOne({ 'ref': { $in: ref } }).sort({ 'createdAt': -1 }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
        populate: {
          path: 'product',
        },
      },
    }).populate({
      path: 'appointment',
      populate: {
        path: 'user',
      },
    }).populate({
      path: 'subscription',
      populate: {
        path: 'user',
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionsByUser error', err)
      });

    return {
      status: "success",
      data: transactions,
    }
  }

  async verificationAmountToWithdraw(id: string, amount: string) {
    const transactions = await this.transactionModel.find({ 'user': { $in: id }, 'status': { $in: [5] } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionsByUser error', err)
        return err;
      });
    console.log(transactions.length);
    let total = 0;
    if (transactions.length > 0) {
      await Promise.all(transactions.map(async (elem) => {
        total += elem.amount;
      }));
      if (total >= parseInt(amount)) {
        return {
          status: "success",
          msg: "You can Withdraw",
        }
      } else {
        return {
          status: "error",
          msg: "Insuficiant balance.",
        }
      }
    } else {
      return {
        status: "error",
        msg: "Insuficiant balance.",
      }
    }
  }

  async findCompletedAmount(id: string) {
    const transactions = await this.transactionModel.find({ 'user': { $in: id }, 'status': { $in: [5] } }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
        populate: {
          path: 'product',
        },
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionsByUser error', err)
      });


    return {
      status: "success",
      data: transactions,
    }
  }

  async findPendingAmount(id: string) {
    const transactions = await this.transactionModel.find({ 'user': { $in: id }, 'status': { $in: [1, 2, 3, 4] } }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
        populate: {
          path: 'product',
        },
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionsByUser error', err)
      });

    return {
      status: "success",
      data: transactions,
    }
  }

  async findByUser(id: string) {
    const transactions = await this.transactionModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
        populate: {
          path: 'product',
        },
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionsByUser error', err)
      });

    return {
      status: "success",
      data: transactions,
    }
  }

  async findById(id: string) {
    const transaction = await this.transactionModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionById error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found 56', HttpStatus.NOT_FOUND);
    }

    return transaction;
  }

  findOne(id: string) {
    return `This action returns a #${id} transaction`;
  }

  async update(id: string, updateTransactionDto: UpdateTransactionDto) {
    const transaction = await this.findById(id)
    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }
    await this.transactionModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateTransactionDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update store error', error)
        return error;
      })

    const newTransaction = await this.findById(id)

    return {
      status: 'success',
      message: `Transaction ${newTransaction.ref} successfully updated.`,
      data: newTransaction,
    }
  }

  remove(id: string) {
    return `This action removes a #${id} transaction`;
  }
}
