import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { ItemOrder, ItemOrderDocument } from './schemas/item-order.schema';
import { Transaction, TransactionDocument } from '../transaction/schemas/transaction.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { StoresService } from '../stores/stores.service';
import { AddressService } from '../address/address.service';
import { CostService } from 'src/cost/cost.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { ServicesService } from 'src/services/services.service';
import { TypevehicleService } from 'src/typevehicle/typevehicle.service';
import { HttpService } from '@nestjs/axios';

const admin = require('firebase-admin');
//cle du projet firebase
const serviceAccount = {
  "type": "service_account",
  "project_id": "kaya-4e1a7",
  "private_key_id": "11b504a02192b17a13f9cf2d56cd7deb20944720",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC1SmuLAl65MiEa\ncRf/uaVb7JtnfV4K608erb2SIzkGzugaxWzeWjlxohMGwY7sqdKzrhd3T2yQRFdz\nLzsey09IFLynSsncN2M6DUvb8QB1+KziFwlQUt4Wc2E1z9niuSc6YRD3RXNokyVy\nwbwzj38flmqA/dqRwNYkDTpXdnFPFerR1XqKtB7a+C6jxXP9FKu2yZe4ggBjhsEK\n2FxdccesnBO4sqB+MKIGRUFwiPTS090zFp1ZCpmTrXIY/DMsqA3NK62qcxh+De/G\nsZEJ2OPTwLSl5DdQfaeRuDyw23rlBQ6IT4v+Po02xKVWYjkrSWhwFYYQGsX1ugVd\nGekPAQDtAgMBAAECggEAEsTWp3iiV+gRt0wYIPiWXxL679bx4o2EDngMVVHiOIs5\nSnRAFjEfG12dPKjTZDscvk96zHZjlfgNWbZ9F24TEjJbabJ7fZoaYss3nFiyJISP\nWYTrCO7bYVWmrcyMEUX8ArZD7GW7UgtR6DSYiHoFvj5zXlFpzIc7ZFYeQSnZB0ff\n9ZcYDtx/0lmo3+jfAmYs24/XvLwU8z+L3mIHFre6B/uVoZxSOrq6lBtfh1CxQQfQ\nwdOdtcrrU8Kx+cHWBFWGCGeWvqIOleEzSWBf7dH37B4eseWo83qSIXnlZ0pjYnw6\nNjJGJU2nxRWWd/TV1zoCiSg91eHQewPFSuVTYVKEvQKBgQDhY1jgJg0aYBZNjVmq\nB7yjPf0I0Zytbqi3h0No5bHqd+kKKBqbO6zsaqW1i2SKwJ5mQNfVhM4MrbKMBTug\n0xaFrAKEZQ2sB5tGLr7BLCiMCusMZxXHW4eMJwxW43RJNBWUjuHBGEbstu8uR7M1\niA57AnZCSoggiJtfC0hO2ggg+wKBgQDN6dM1Fss2enL7QDxdb5VCeSZh+ynt+lHK\nDees/0ibredO8YZUwXDVKBhMETPwD9RHiGXPqVnmaBxpxsogP0AFPvG60371drhY\nEwmW7HH8BW2HWAjZe7bZH2+vRml4XWCkGmMGys8aE38nsKX3cspGFoyNAGhWPKB3\nz4zsPu/RNwKBgHWUS1Ab6agByoDIpacTBDCw7OkF2NONMA0WTm9RrKAhz/vRchfb\naNmoxSvRPTE5TSkQ2Mf10TxB/SwYqsO6ezxewK1qvlgpW7KgPjkuHTT5mSdOO8lV\nkX/m+wP1ArwRpNRsOY9vZ8ijomElXHMnuE4puaHZmexG9678hstD6QuzAoGBAJEp\nKtz9QasZLZ/US/nupMGk2JswTgHXevs/TDjYCt68/RjZCcMMT7flOSO+6OdusU7w\naB26HIdik80599o93KsWEaGMYa83z4M/gH4mF8D8LpfARxTSszdjgv+EWuwgn/Vw\nKKlsJg4S+owHaykDgndghBsO038f5FwyM/2D7NqHAoGBALzSnHW2wcwr+fvqkW5J\nBPyL16R3HXGhQK3fU8373nRtYICvl5i31d3SC1N6xLNxllUrLpYcca8Vn6x0ppYL\nrG859+rKWg90CDlp04hnptqcPFHQIOP/A0aaOroOn/H5l6wpAdjQ+rjhlc+y7m1u\nhWbH1o1TC1n81Vohl8Rd4NeN\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-u273w@kaya-4e1a7.iam.gserviceaccount.com",
  "client_id": "111420734568595805378",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-u273w%40kaya-4e1a7.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};
//Initialisation de firebase
admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    @InjectModel(ItemOrder.name) private itemOrderModel: Model<ItemOrderDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly usersService: UsersService,
    private readonly servicesService: ServicesService,
    private readonly typevehicleService: TypevehicleService,
    private readonly httpService: HttpService
  ) { }

  async create(createOrderDto: CreateOrderDto, files) {
    if (!files) {
      return {
        status: "error",
        message: "PLease upload image of your item",
        data: null,
      }
    }
    const items = JSON.parse(createOrderDto.items);
    delete createOrderDto['items'];
    const express = createOrderDto.express == "1" ? 1 : 0;
    const user = await this.usersService.findById(createOrderDto.userId);
    const service = await this.servicesService.findById(createOrderDto.serviceId);
    const typevehicle = await this.typevehicleService.findById(createOrderDto.typevehicleId);
    const order = new this.orderModel(createOrderDto);
    order.user = user._id
    order.service = service._id
    order.express = express
    order.typevehicle = typevehicle._id
    await Promise.all(items.map(async (cmd) => {
      const image = files.filter((item) => item.fieldname === cmd.imageName);
      console.log(image, cmd);
      const itemOrder = new this.itemOrderModel({ order: order._id, price: cmd.price, weight: cmd.weight, image: image[0].filename, name: cmd.name, quantity: cmd.quantity });

      await itemOrder.save();
      order.items.push(itemOrder._id);
    }));
    await order.save();

    const sms = `New Package to transport. Check in your app account and make an invoice`;
    const title = "Kaya";
    const users = this.usersService.findAllWithProfile("Transporter").then(async (result) => {
      if (result.length > 0) {
        await Promise.all(result.map(async (cmd) => {
          console.log(cmd, sms, title);
          const respSMS = await this.sendSMS(cmd?.token_notif, sms, title);
        }));
      }
    });

    return {
      status: "success",
      message: "Package successfully sended.",
      data: order,
    }
  }

  async sendSMS(toToken: any, sms: string, title: string) {
    const message = {
      notification: {
        title: title,
        body: sms
      },
      token: toToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    return admin.messaging().send(message)
      .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
      })
      .catch((error) => {
        console.log('Error sending message:', error);
      });
  }

  async smsCallback(error, responseBody) {
    if (error === null) {
      console.log("\nResponse body:\n" + JSON.stringify(responseBody));
    } else {
      console.error("Unable to send SMS. Error:\n\n" + error);
    }
  }

  async findAll() {
    const orders = await this.orderModel.find({ 'status': { $in: 1 } }).sort({ 'createdAt': -1 }).populate(['user', 'items', 'service', 'typevehicle'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: orders,
    }
  }

  async findByTransporter(id: string) {
    const orders = await this.orderModel.find({ 'transporter': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'service', 'typevehicle', 'items'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getOrdersByTransporter error', err)
      });

    return {
      status: "success",
      data: orders,
    }
  }

  async findByUser(id: string) {
    const orders = await this.orderModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'service', 'typevehicle', 'items'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getOrdersByUser error', err)
      });

    return {
      status: "success",
      data: orders,
    }
  }

  async findByVehicle(id: string) {
    const orders = await this.orderModel.find({ 'vehicle': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'address', 'cost', 'vehicle']).populate({
      path: 'items',
      populate: {
        path: 'product',
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getOrdersByVehicle error', err)
      });

    return {
      status: "success",
      data: orders,
    }
  }

  async findByStore(id: string) {
    const orders = await this.orderModel.find({ 'store': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'address']).populate({
      path: 'items',
      populate: {
        path: 'product',
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getOrdersByStore error', err)
      });

    return {
      status: "success",
      data: orders,
    }
  }

  async findStatsByVehicle(id: string) {
    const orders = await this.orderModel.find({ 'vehicle': { $in: id } }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByVehicle error', err)
      });

    const pending = await this.orderModel.find({ 'vehicle': id, 'status': 2 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByVehicle error', err)
      });

    const processing = await this.orderModel.find({ 'vehicle': id, 'status': 3 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByVehicle error', err)
      });

    const canceled = await this.orderModel.find({ 'vehicle': id, 'status': 6 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByVehicle error', err)
      });

    const completed = await this.orderModel.find({ 'vehicle': id, 'status': 5 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByVehicle error', err)
      });

    return {
      status: "success",
      data: [{
        name: "Orders",
        value: orders,
        iconType: "Ionicons",
        iconName: "ios-cart-outline",
        color: "#FFF1C6",
        iconContainerColor: "#FFC10D",
      },
      {
        name: "Pending",
        value: pending,
        iconType: "MaterialIcons",
        iconName: "md-time-outline",
        color: "#E8EFFF",
        iconContainerColor: "#4C84FF",
      },
      {
        name: "Canceled",
        value: canceled,
        iconType: "Ionicons",
        iconName: "ios-stop-circle-outline",
        color: "#FFEDED",
        iconContainerColor: "#D74B4A",
      },
      {
        name: "Processing",
        value: processing,
        iconType: "Feather",
        iconName: "ios-logo-electron",
        color: "#FFE8CE",
        iconContainerColor: "#FFA53C",
      },
      {
        name: "Completed",
        value: completed,
        iconType: "Ionicons",
        iconName: "md-checkmark-circle-outline",
        color: "#E7F5EC",
        iconContainerColor: "#1C9A4E",
      }],
    }
  }

  async findStatsByStore(id: string) {
    const orders = await this.orderModel.find({ 'store': { $in: id } }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByStore error', err)
      });

    const pending = await this.orderModel.find({ 'store': id, 'status': 2 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByStore error', err)
      });

    const processing = await this.orderModel.find({ 'store': id, 'status': 3 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByStore error', err)
      });

    const canceled = await this.orderModel.find({ 'store': id, 'status': 6 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByStore error', err)
      });

    const completed = await this.orderModel.find({ 'store': id, 'status': 5 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByStore error', err)
      });

    return {
      status: "success",
      data: [{
        name: "Orders",
        value: orders,
        iconType: "Ionicons",
        iconName: "ios-cart-outline",
        color: "#FFF1C6",
        iconContainerColor: "#FFC10D",
      },
      {
        name: "Pending",
        value: pending,
        iconType: "MaterialIcons",
        iconName: "md-time-outline",
        color: "#E8EFFF",
        iconContainerColor: "#4C84FF",
      },
      {
        name: "Canceled",
        value: canceled,
        iconType: "Ionicons",
        iconName: "ios-stop-circle-outline",
        color: "#FFEDED",
        iconContainerColor: "#D74B4A",
      },
      {
        name: "Processing",
        value: processing,
        iconType: "Feather",
        iconName: "ios-logo-electron",
        color: "#FFE8CE",
        iconContainerColor: "#FFA53C",
      },
      {
        name: "Completed",
        value: completed,
        iconType: "Ionicons",
        iconName: "md-checkmark-circle-outline",
        color: "#E7F5EC",
        iconContainerColor: "#1C9A4E",
      }],
    }
  }

  async findStatsByUser(id: string) {
    const orders = await this.orderModel.find({ 'user': { $in: id } }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByUser error', err)
      });

    const pending = await this.orderModel.find({ 'user': id, 'status': 2 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByUser error', err)
      });

    const processing = await this.orderModel.find({ 'user': id, 'status': 3 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByUser error', err)
      });

    const canceled = await this.orderModel.find({ 'user': id, 'status': 6 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByUser error', err)
      });

    const completed = await this.orderModel.find({ 'user': id, 'status': 5 }).exec()
      .then((result) => {
        return result == null ? 0 : result.length;
      })
      .catch((err) => {
        console.log('getOrdersByUser error', err)
      });

    return {
      status: "success",
      data: [{
        name: "Orders",
        value: orders,
        iconType: "Ionicons",
        iconName: "ios-cart-outline",
        color: "#FFF1C6",
        iconContainerColor: "#FFC10D",
      },
      {
        name: "Pending",
        value: pending,
        iconType: "MaterialIcons",
        iconName: "md-time-outline",
        color: "#E8EFFF",
        iconContainerColor: "#4C84FF",
      },
      {
        name: "Canceled",
        value: canceled,
        iconType: "Ionicons",
        iconName: "ios-stop-circle-outline",
        color: "#FFEDED",
        iconContainerColor: "#D74B4A",
      },
      {
        name: "Processing",
        value: processing,
        iconType: "Feather",
        iconName: "ios-logo-electron",
        color: "#FFE8CE",
        iconContainerColor: "#FFA53C",
      },
      {
        name: "Completed",
        value: completed,
        iconType: "Ionicons",
        iconName: "md-checkmark-circle-outline",
        color: "#E7F5EC",
        iconContainerColor: "#1C9A4E",
      }],
    }
  }

  async receivedOrder(id: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }

    transaction.status = 5;
    transaction.save();

    const order = await this.findById(id);
    if (order.status != 4) {
      throw new HttpException('Order must be confirmed before', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.orderModel.updateOne({ _id: id }, {
      status: 5
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })


    const newOrder = await this.findById(id)

    return {
      status: 'success',
      message: `Order successfully received.`,
      data: newOrder,
    }
  }

  async canceledOrder(id: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }

    transaction.status = 6;
    transaction.save();

    const order = await this.findById(id);
    if (order.status != 2 && order.status != 1) {
      throw new HttpException('Order must be confirmed before', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.orderModel.updateOne({ _id: id }, {
      status: 6
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    const newOrder = await this.findById(id)

    return {
      status: 'success',
      message: `Order successfully canceled.`,
      data: newOrder,
    }
  }

  async confirmedOrder(id: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: id } }).exec()
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

    const order = await this.findById(id);
    if (order.status != 1) {
      throw new HttpException('Order must be created before', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.orderModel.updateOne({ _id: id }, {
      status: 2
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })


    const newOrder = await this.findById(id)

    return {
      status: 'success',
      message: `Order successfully confirmed.`,
      data: newOrder,
    }
  }

  async acceptedOrder(id: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }
    transaction.status = 3;
    transaction.save();

    const order = await this.findById(id);
    if (order.status != 2) {
      throw new HttpException('Order must be confirmed before', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.orderModel.updateOne({ _id: id }, {
      status: 3
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })


    const newOrder = await this.findById(id)

    return {
      status: 'success',
      message: `Order successfully accepted.`,
      data: newOrder,
    }
  }

  async deliveredOrder(id: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }
    transaction.status = 4;
    transaction.save();

    const order = await this.findById(id);
    if (order.status != 3) {
      throw new HttpException('Order must be accepted before', HttpStatus.NOT_ACCEPTABLE);
    }
    await this.orderModel.updateOne({ _id: id }, {
      status: 4
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })


    const newOrder = await this.findById(id)

    return {
      status: 'success',
      message: `Order successfully delivered.`,
      data: newOrder,
    }
  }

  async rejectedOrder(id: string) {
    const transaction = await this.transactionModel.findOne({ 'order': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }
    transaction.status = 7;
    transaction.save();

    await this.orderModel.updateOne({ _id: id }, {
      status: 7
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })


    const newOrder = await this.findById(id)

    return {
      status: 'success',
      message: `Order successfully rejected.`,
      data: newOrder,
    }
  }

  async findById(id: string) {
    const order = await this.orderModel.findById(id).populate(['user', 'items', 'invoices'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getOrderById error', err)
      });

    if (!order) {
      throw new HttpException('Order Not found 56', HttpStatus.NOT_FOUND);
    }

    return order;
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: string) {
    const order = await this.findById(id)
    if (!order) {
      throw new HttpException('Order Not found', HttpStatus.NOT_FOUND);
    }
    await this.orderModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Order successfully deleted.",
    }
  }
}
