import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { UpdateDeliveryStoreDto } from './dto/update-delivery-store.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Store, StoreDocument } from './schemas/store.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store.name) private storeModel: Model<StoreDocument>,
    private readonly usersService: UsersService
  ) { }

  async create(createStoreDto: CreateStoreDto, file: Express.Multer.File) {
    if (file) {
      console.log(file.path)
      createStoreDto['image'] = file.path.split("/")[2];
    }
    const user = await this.usersService.findById(createStoreDto.userId);
    const store = new this.storeModel(createStoreDto)
    store.user = user._id
    await store.save();

    user.stores.push(store._id);
    user.save();

    return {
      status: "success",
      message: "Store successfully created.",
      data: store,
    }
  }

  async findAll() {
    const stores = await this.storeModel.find().populate(['user', 'orders', 'products']).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: stores,
    }
  }

  async findByUser(id: string) {
    const stores = await this.storeModel.find({ 'user': { $in: id } }).populate(['products', 'orders'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: stores,
    }
  }

  async findById(id: string) {
    const store = await this.storeModel.findById(id).populate(['products', 'orders'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getStoreById error', err)
      });

    if (!store) {
      throw new HttpException('Store Not found 56', HttpStatus.NOT_FOUND);
    }

    return store;
  }

  async findOne(id: string) {
    const store = await this.storeModel.findById(id).populate(['users', 'orders', 'products']).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        throw new HttpException('Store Not found', HttpStatus.NOT_FOUND);
      });

    if (!store) {
      throw new HttpException('Store Not found', HttpStatus.NOT_FOUND);
    }

    return {
      status: 'success',
      data: store,
    }
  }

  async updateDelivery(id: string, updateStoreDto: UpdateDeliveryStoreDto) {
    const store = await this.findById(id);
    if (!store) {
      throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
    }
    await this.storeModel.updateOne({ _id: id }, {
      price_livraison: parseInt(updateStoreDto['price_livraison'])
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })


    const newStore = await this.findById(id)

    return {
      status: 'success',
      message: `Store successfully update.`,
      data: newStore,
    }
  }

  async update(id: string, updateStoreDto: UpdateStoreDto, file: Express.Multer.File) {
    if (file) {
      updateStoreDto['image'] = file.path.split("/")[2];
    }
    const store = await this.findById(id)
    if (!store) {
      throw new HttpException('Store Not found', HttpStatus.NOT_FOUND);
    }
    await this.storeModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateStoreDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update store error', error)
        return error;
      })

    const newStore = await this.findById(id)

    return {
      status: 'success',
      message: `Store ${newStore.name} successfully updated.`,
      data: newStore,
    }
  }

  async remove(id: string) {
    const store = await this.findById(id)
    if (!store) {
      throw new HttpException('Store Not found', HttpStatus.NOT_FOUND);
    }
    await this.storeModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Store successfully deleted.",
    }
  }
}
