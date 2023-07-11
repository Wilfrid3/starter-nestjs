import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { map } from 'rxjs/operators';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';
import { VehicleService } from 'src/vehicle/vehicle.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice, InvoiceDocument } from './schemas/invoice.schema';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectModel(Invoice.name) private invoiceModel: Model<InvoiceDocument>,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService,
    private readonly vehicleService: VehicleService,
    private readonly httpService: HttpService
  ) { }

  async create(createInvoiceDto: CreateInvoiceDto) {
    const user = await this.usersService.findById(createInvoiceDto.userId);
    const order = await this.orderService.findById(createInvoiceDto.orderId);
    const vehicle = await this.vehicleService.findById(createInvoiceDto.vehicleId);
    const invoice = new this.invoiceModel(createInvoiceDto);
    invoice.order = order._id;
    invoice.user = user._id;
    invoice.vehicle = vehicle._id;

    await invoice.save();
    // order.invoices.push(invoice._id);
    order.invoicesNumber += 1;
    order.status = 2;
    order.save();

    const sms = `New Invoice for your package.`;
    const title = `Kaya - ${user.name}`;
    console.log("User token", order?.user?.token_notif);
    const respSMS = await this.orderService.sendSMS(order?.user?.token_notif, createInvoiceDto.message, title);

    return {
      status: "success",
      message: "Invoice successfully sended.",
      data: order,
    }
  }

  async sendSMS(to, sms: string, title: string) {
    const data = {
      token: to,
      message: sms,
      title: title,
    }
    const http = this.httpService.post('http://192.168.88.90:4200/notif', data, {
      headers: {
        'Accept': 'application/json'
      }
    }).pipe(map(response => console.log("Response ", response.data)));
    console.log("HTTP ", http)
    return http;
  }

  async findByOrder(id: string) {
    const invoices = await this.invoiceModel.find({ 'order': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
      },
    }).populate({
      path: 'order',
      populate: {
        path: 'typevehicle',
      },
    }).populate({
      path: 'order',
      populate: {
        path: 'service',
      },
    }).populate({
      path: 'vehicle',
      populate: {
        path: 'typevehicle',
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return [];
      });

    return {
      status: "success",
      data: invoices,
    }
  }

  async findByUser(id: string) {
    const invoices = await this.invoiceModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
      },
    }).populate({
      path: 'order',
      populate: {
        path: 'typevehicle',
      },
    }).populate({
      path: 'order',
      populate: {
        path: 'service',
      },
    }).populate({
      path: 'vehicle',
      populate: {
        path: 'typevehicle',
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getInvoicesByUser error', err)
      });

    return {
      status: "success",
      data: invoices,
    }
  }

  async canceledInvoice(id: string) {
    const invoice = await this.invoiceModel.findById(id).populate(['order', 'user', 'vehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!invoice) {
      throw new HttpException('Invoice Not found', HttpStatus.NOT_FOUND);
    }

    const order = await this.orderService.findById(invoice?.order?._id);

    const invoices = await this.invoiceModel.find({ 'order': { $in: order._id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return [];
      });

    const invoicesList = invoices.filter((item) => item.status == 1);
    invoice.status = 3;
    invoice.save();
    if (invoicesList.length <= 0) {
      order.status = 1;
      order.save();
    }

    const newInvoice = await this.findById(id);

    return {
      status: 'success',
      message: `Invoice successfully canceled.`,
      data: newInvoice,
    }
  }

  async rejectedInvoice(id: string) {
    const invoice = await this.invoiceModel.findById(id).populate(['order', 'user', 'vehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!invoice) {
      throw new HttpException('Invoice Not found', HttpStatus.NOT_FOUND);
    }

    const order = await this.orderService.findById(invoice?.order?._id);

    const invoices = await this.invoiceModel.find({ 'order': { $in: order._id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        return [];
      });

    const invoicesList = invoices.filter((item) => item.status == 1);
    invoice.status = 4;
    invoice.save();

    if (invoicesList.length <= 0) {
      order.status = 1;
    }
    order.reject = 1;
    order.rejectAmount = invoice.price;
    order.save();

    const newInvoice = await this.findById(id);

    const sms = `This invoice has rejected by a customer.`;
    const title = "Kaya";
    const users = this.usersService.findAllWithProfile("Transporter").then(async (result) => {
      if (result.length > 0) {
        await Promise.all(result.map(async (cmd) => {
          const respSMS = await this.orderService.sendSMS(cmd?.token_notif, sms, title);
        }));
      }
    });

    return {
      status: 'success',
      message: `Invoice successfully rejected.`,
      data: newInvoice,
    }
  }

  async validatedInvoice(id: string) {
    const invoice = await this.invoiceModel.findById(id).populate(['order', 'user', 'vehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!invoice) {
      throw new HttpException('Invoice Not found', HttpStatus.NOT_FOUND);
    }

    const order = await this.orderService.findById(invoice?.order?._id);

    invoice.status = 2;
    invoice.save();

    order.status = 3;
    order.save();

    const sms = `Customer has validated your invoice. It's time to pick a package and delivery. Ref: #${order.ref}`;
    const title = "Kaya Invoice";

    const respSMS = this.orderService.sendSMS(invoice?.user?.token_notif, sms, title);

    const newInvoice = await this.findById(id);

    return {
      status: 'success',
      message: `Invoice successfully validated.`,
      data: newInvoice,
    }
  }

  findAll() {
    return `This action returns all invoice`;
  }

  async findById(id: string) {
    const invoice = await this.invoiceModel.findById(id).populate(['user']).populate({
      path: 'order',
      populate: {
        path: 'items',
      },
    }).populate({
      path: 'order',
      populate: {
        path: 'typevehicle',
      },
    }).populate({
      path: 'order',
      populate: {
        path: 'service',
      },
    })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getInvoiceById error', err)
      });

    if (!invoice) {
      throw new HttpException('Invoice Not found 56', HttpStatus.NOT_FOUND);
    }

    return invoice;
  }

  update(id: number, updateInvoiceDto: UpdateInvoiceDto) {
    return `This action updates a #${id} invoice`;
  }

  remove(id: number) {
    return `This action removes a #${id} invoice`;
  }
}
