import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderService } from 'src/order/order.service';
import { UsersService } from 'src/users/users.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location, LocationDocument } from './schemas/location.schema';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name) private locationModel: Model<LocationDocument>,
    private readonly usersService: UsersService,
    private readonly orderService: OrderService
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    const user = await this.usersService.findById(createLocationDto.userId);
    const location = new this.locationModel(createLocationDto);
    location.user = user._id;

    await location.save();

    return {
      status: "success",
      message: "Location successfully added.",
      data: location,
    }
  }

  async findByOrder(id: string) {
    const locations = await this.locationModel.find({ 'order': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user']).populate({
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
        return [];
      });

    return {
      status: "success",
      data: locations,
    }
  }

  async findByUser(id: string) {
    const locations = await this.locationModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user']).populate({
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
        return [];
      });

    return {
      status: "success",
      data: locations,
    }
  }

  findAll() {
    return `This action returns all location`;
  }

  findOne(id: number) {
    return `This action returns a #${id} location`;
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return `This action updates a #${id} location`;
  }

  remove(id: number) {
    return `This action removes a #${id} location`;
  }
}
