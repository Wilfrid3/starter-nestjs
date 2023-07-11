import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypevehicleService } from 'src/typevehicle/typevehicle.service';
import { UnityService } from 'src/unity/unity.service';
import { UsersService } from 'src/users/users.service';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle, VehicleDocument } from './schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(
    @InjectModel(Vehicle.name) private vehicleModel: Model<VehicleDocument>,
    private readonly usersService: UsersService,
    private readonly unityService: UnityService,
    private readonly typevehicleService: TypevehicleService
  ) { }

  async create(createVehicleDto: CreateVehicleDto, files) {
    if (files) {
      files.forEach((item) => {
        createVehicleDto[item.fieldname] = item.filename;
      })
    }
    const user = await this.usersService.findById(createVehicleDto.userId);
    const unity = await this.unityService.findById(createVehicleDto.unityId);
    const typevehicle = await this.typevehicleService.findById(createVehicleDto.typevehicleId);
    const vehicle = new this.vehicleModel(createVehicleDto);
    vehicle.user = user._id;
    vehicle.unity = unity._id;
    vehicle.typevehicle = typevehicle._id;
    await vehicle.save();

    user.vehicles.push(vehicle._id);
    user.save();

    return {
      status: "success",
      message: "Vehicle successfully created.",
      data: vehicle,
    }
  }

  async findAll() {
    const vehicles = await this.vehicleModel.find().populate(['user', 'typevehicle', 'unity'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: vehicles,
    }
  }

  async findByUser(id: string) {
    const vehicles = await this.vehicleModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'typevehicle', 'unity'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getVehiclesByUser error', err)
      });

    return {
      status: "success",
      data: vehicles,
    }
  }

  async findByUserAll(id: string) {
    const vehicles = await this.vehicleModel.find({ 'user': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getVehiclesByUser error', err)
        return [];
      });
      
      let res = [];
      if (vehicles.length > 0) {
        await Promise.all(vehicles.map(async (elem) => {
          res.push({ label: elem.name, value: elem._id });
        }));
      }

    return {
      status: "success",
      data: res,
    }
  }

  async findByType(id: string) {
    const vehicles = await this.vehicleModel.find({ 'typevehicle': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'typevehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getVehiclesByUser error', err)
      });

    return {
      status: "success",
      data: vehicles,
    }
  }

  async findById(id: string) {
    const vehicle = await this.vehicleModel.findById(id).populate(['user', 'typevehicle', 'unity'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getVehicleById error', err)
      });

    if (!vehicle) {
      throw new HttpException('Vehicle Not found 56', HttpStatus.NOT_FOUND);
    }

    return vehicle;
  }

  async findOne(id: string) {
    const vehicle = await this.vehicleModel.findById(id).populate(['user', 'typevehicle', 'unity'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getVehicleById error', err)
      });

    if (!vehicle) {
      throw new HttpException('Vehicle Not found 56', HttpStatus.NOT_FOUND);
    }

    return vehicle;
  }

  async update(id: string, updateVehicleDto: UpdateVehicleDto, files) {
    
    if (files) {
      files.forEach((item) => {
        updateVehicleDto[item.fieldname] = item.filename;
      })
    }

    const vehicle = await this.findById(id)
    if (!vehicle) {
      throw new HttpException('Vehicle Not found', HttpStatus.NOT_FOUND);
    }
    const updateVehicle = await this.vehicleModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateVehicleDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update vehicle error', error)
        return error;
      })

    if (updateVehicleDto.typevehicleId) {
      const typevehicle = await this.typevehicleService.findById(updateVehicleDto.typevehicleId);
      updateVehicle.typevehicle = typevehicle._id
    }
    if (updateVehicleDto.unityId) {
      const unity = await this.unityService.findById(updateVehicleDto.unityId);
      updateVehicle.unity = unity._id
    }
    updateVehicle.save();

    const newVehicle = await this.findById(id)

    return {
      status: 'success',
      message: `Vehicle ${newVehicle.name} successfully updated.`,
      data: newVehicle,
    }
  }

  async remove(id: string) {
    const vehicle = await this.findById(id)
    if (!vehicle) {
      throw new HttpException('Vehicle Not found', HttpStatus.NOT_FOUND);
    }
    await this.vehicleModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Vehicle successfully deleted.",
    }
  }
}
