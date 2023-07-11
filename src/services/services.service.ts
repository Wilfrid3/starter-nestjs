import { Injectable, StreamableFile, Response, HttpStatus, HttpException } from '@nestjs/common';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { ServiceDocument, Service } from '../schemas/service.schema';
import { UserDocument, User } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { UsersService } from '../users/users.service';

@Injectable()
export class ServicesService {
  SERVER_URL: string = "http://192.168.100.183:3300/";
  constructor(@InjectModel(Service.name) private serviceModel: Model<ServiceDocument>
    , @InjectModel(Service.name) private userModel: Model<UserDocument>) { }

  async create(createServiceDto: CreateServiceDto) {
    const newService = new this.serviceModel(createServiceDto);
    await newService.save();
    // return {'succes':true, 'data':newService, 'msg':"Service Created"};

    return {
      status: "success",
      message: "Service successfully created.",
      data: newService,
    }
  }

  async findByUser(id: string) {
    const services = await this.serviceModel.find({ 'user': { $in: id } }).populate(['user'])
      .then((result) => {
        return result;
      }).catch((error) => {
        console.log(error);
      })

    return {
      status: "success",
      data: services,
    }
  }

  async findById(id: string) {
    const service = await this.serviceModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getServiceById error', err)
      });

    if (!service) {
      throw new HttpException('Service Not found 56', HttpStatus.NOT_FOUND);
    }

    return service;
  }

  /**
   * Update a Service by id
   * @param {string} id - The id of the Service you want to update.
   * @param {UpdateServiceDto} updateServiceDto - UpdateServiceDto
   * @returns The updated Service.
   */
  async update(id: string, updateServiceDto: UpdateServiceDto, file: Express.Multer.File) {
    try {
      if (file) {
        updateServiceDto['image'] = file.path.split("\\")[1];
      }
      const updateService = await this.serviceModel.findByIdAndUpdate(id, {
        $set: { ...updateServiceDto },
      });
      // return {'succes':true, 'data':updateService, 'msg':"Service Updated"};
      return updateService;
    } catch (error) {
      // return {'succes':false, 'data':error, 'msg':"Updated Error"};
      return error;
    }
  }

  async subscribe(serviceId: string, userId: string) {
    return await this.userModel.findByIdAndUpdate(userId, { $push: { services: serviceId } }, { new: true, useFindAndModify: false }).exec();
  }

  async findAll() {
    const services = await this.serviceModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
    let res = [];
    if (services.length > 0) {
      await Promise.all(services.map(async (elem) => {
        res.push({ label: elem.name, value: elem._id });
      }));
    }

    return {
      status: 'success',
      data: res,
    };
  }

  async findByType(type: string) {
    const services = await this.serviceModel.find({ 'typeservice': { $in: type }, 'user': { $exists: false } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: services,
    }
  }

  async remove(id: string) {
    // await this.serviceModel.delete($id);
    // return {'succes':true, 'msg':"Service deleted", 'data':null};
    return await this.serviceModel.findByIdAndDelete(id);
  }
}
