import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DestinationService } from 'src/destination/destination.service';
import { TypevehicleService } from 'src/typevehicle/typevehicle.service';
import { UsersService } from 'src/users/users.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { Cost, CostDocument } from './schemas/cost.schema';

@Injectable()
export class CostService {
  constructor(
    @InjectModel(Cost.name) private costModel: Model<CostDocument>,
    private readonly usersService: UsersService,
    private readonly destinationService: DestinationService,
    private readonly typevehicleService: TypevehicleService
  ) { }

  async create(createCostDto: CreateCostDto) {
    const user = await this.usersService.findById(createCostDto.userId);
    const typevehicle = await this.typevehicleService.findById(createCostDto.typevehicleId);
    const destination = await this.destinationService.findById(createCostDto.destinationId);
    const existCosts = await this.findCostsIfExist(user._id, destination._id, typevehicle._id);
    if (existCosts != null && existCosts.length > 0) {
      return {
        status: "false",
        message: "Cost already exist for this destination and type of vehicle.",
        data: null,
      }
    }
    const cost = new this.costModel(createCostDto)
    cost.destination = destination._id
    cost.user = user._id
    cost.typeVehicle = typevehicle._id
    cost.type = 0
    await cost.save();

    return {
      status: "success",
      message: "Cost successfully created.",
      data: cost,
    }
  }

  async createByAdmin(createCostDto: CreateCostDto) {
    const user = await this.usersService.findById(createCostDto.userId);
    const typevehicle = await this.typevehicleService.findById(createCostDto.typevehicleId);
    const destination = await this.destinationService.findById(createCostDto.destinationId);
    const existCosts = await this.findCostsIfExist(user._id, destination._id, typevehicle._id);
    if (existCosts != null && existCosts.length > 0) {
      return {
        status: "false",
        message: "Cost already exist for this destination and type of vehicle.",
        data: null,
      }
    }
    const cost = new this.costModel(createCostDto)
    cost.destination = destination._id
    cost.user = user._id
    cost.typeVehicle = typevehicle._id
    cost.type = 1
    await cost.save();

    return {
      status: "success",
      message: "Cost successfully created.",
      data: cost,
    }
  }

  async findByUser(id: string) {
    const costs = await this.costModel.find({ 'user': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'destination', 'typeVehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCostsByUser error', err)
      });

    return {
      status: "success",
      data: costs,
    }
  }

  async findCostsIfExist(user: string, destination: string, typeVehicle: string) {
    const costs = await this.costModel.find({ $and: [{ user: user }, { destination: destination }, { typeVehicle: typeVehicle }] }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCostsIfExist error', err)
        return null;
      });

    return costs;
  }

  async findCosts(destination: string, typeVehicle: string) {
    const costs = await this.costModel.find({ $and: [{ destination: destination }, { typeVehicle: typeVehicle }] }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCostsIfExist error', err)
        return null;
      });


    return {
      status: "success",
      data: costs,
    }
  }

  async findById(id: string) {
    const cost = await this.costModel.findById(id).populate(['user', 'destination', 'typeVehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCostById error', err)
      });

    if (!cost) {
      throw new HttpException('Cost Not found 56', HttpStatus.NOT_FOUND);
    }

    return cost;
  }

  async findAll() {
    const costs = await this.costModel.find().populate(['user', 'destination', 'typeVehicle'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: costs,
    }
  }

  async findOne(id: string) {
    const cost = await this.costModel.findById(id).populate(['user', 'destination', 'typeVehicle'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCostById error', err)
      });

    if (!cost) {
      throw new HttpException('Cost Not found 56', HttpStatus.NOT_FOUND);
    }

    return cost;
  }

  async update(id: string, updateCostDto: UpdateCostDto) {
    const cost = await this.findById(id)
    if (!cost) {
      throw new HttpException('Cost Not found', HttpStatus.NOT_FOUND);
    }
    const updateCost = await this.costModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateCostDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update cost error', error)
        return error;
      })

    if (updateCostDto.destinationId) {
      const destination = await this.destinationService.findById(updateCostDto.destinationId);
      updateCost.destination = destination._id
    }

    if (updateCostDto.typevehicleId) {
      const typvehicle = await this.destinationService.findById(updateCostDto.typevehicleId);
      updateCost.typeVehicle = typvehicle._id
    }
    updateCost.save();

    const newCost = await this.findById(id)

    return {
      status: 'success',
      message: `Cost ${newCost.price} successfully updated.`,
      data: newCost,
    }
  }

  async remove(id: string) {
    const cost = await this.findById(id)
    if (!cost) {
      throw new HttpException('Cost Not found', HttpStatus.NOT_FOUND);
    }
    await this.costModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Cost successfully deleted.",
    }
  }
}
