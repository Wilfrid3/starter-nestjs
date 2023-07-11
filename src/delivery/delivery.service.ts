import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoresModule } from 'src/stores/stores.module';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { Model } from 'mongoose';
import { Delivery, DeliveryDocument } from './schemas/delivery.schema';
import { StoresService } from 'src/stores/stores.service';

@Injectable()
export class DeliveryService {
  constructor(
    @InjectModel(Delivery.name) private deliveryModel: Model<DeliveryDocument>,
    private readonly storeService: StoresService
  ) { }

  async create(createDeliveryDto: CreateDeliveryDto) {
    const store = await this.storeService.findById(createDeliveryDto.store);
    const delivery = new this.deliveryModel(createDeliveryDto)
    delivery.store = store._id
    await delivery.save();

    store.deliveries.push(delivery._id);
    store.save();

    return {
      status: "success",
      message: "Delivery successfully created.",
      data: delivery,
    }
  }

  async findByStore(id: string) {
    const store = await this.storeService.findById(id);
    const deliveries = await this.deliveryModel.find({ 'store': { $in: store._id } })
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })
      let dels = [];
      await Promise.all(deliveries.map(async (elem) => {
        dels.push({label: elem.city+"-"+elem.price, value: elem._id});
      }));
    return {
      status: "success",
      data: dels,
    }
  }

  async findById(id: string) {
    const delivery = await this.deliveryModel.findById(id).populate(['store'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDeliveryById error', err)
      });

    if (!delivery) {
      throw new HttpException('Delivery Not found 56', HttpStatus.NOT_FOUND);
    }

    return delivery;
  }

  async findAll(id: string) {
    const deliveries = await this.deliveryModel.find({ 'store': { $in: id } })
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: deliveries,
    }
  }

  async update(id: string, updateDeliveryDto: UpdateDeliveryDto) {
    const delivery = await this.findById(id)
    if (!delivery) {
      throw new HttpException('Delivery Not found', HttpStatus.NOT_FOUND);
    }
    const deliveryUpdate = await this.deliveryModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateDeliveryDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update delivery error', error)
        return error;
      })

    const newDel = await this.findById(id)
    if (updateDeliveryDto.store) {
      const store = await this.storeService.findById(updateDeliveryDto.store);
      newDel.store = store._id
    }

    newDel.save();


    const newDelivery = await this.findById(id)

    return {
      status: 'success',
      message: `Delivery ${newDelivery.city} successfully updated.`,
      data: newDelivery,
    }
  }

  async remove(id: string) {
    const delivery = await this.findById(id)
    if (!delivery) {
      throw new HttpException('Delivery Not found', HttpStatus.NOT_FOUND);
    }
    await this.deliveryModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Delivery successfully deleted.",
    }
  }
}
