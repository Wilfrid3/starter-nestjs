import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlanningDto } from './dto/create-planning.dto';
import { UpdatePlanningDto } from './dto/update-planning.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Planning, PlanningDocument } from './schemas/planning.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';

@Injectable()
export class PlanningService {

  constructor(
    @InjectModel(Planning.name) private planningModel: Model<PlanningDocument>,
    private readonly usersService: UsersService
  ) { }

  async create(createPlanningDto: CreatePlanningDto) {
    const user = await this.usersService.findById(createPlanningDto.userId);
    const plan = await this.findByUser(createPlanningDto.userId);
    if(plan.data.length <= 0){
      const planning = new this.planningModel(createPlanningDto);
      planning.user = user._id;
      await planning.save();
  
      user.plannings.push(planning);
      await user.save();
      return {
        status: "success",
        message: "Planning successfully created.",
        data: planning,
      }
    }

    return plan;
  }

  async findByUser(id: string) {
    const plannings = await this.planningModel.find({ 'user': { $in: id } }).populate('ranges').populate({
      path: 'ranges',
      populate: { path: 'day' }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })
    return {
      status: "success",
      data: plannings,
    }
  }

  async findMyPlanning(userId: string) {
    const user = await this.usersService.findById(userId);
    const plan = await this.findByUser(userId);
    if(plan.data.length <= 0){
      const planning = new this.planningModel({userId});
      planning.user = user._id;
      await planning.save();
  
      user.plannings.push(planning);
      await user.save();
      return {
        status: "success",
        message: "Planning successfully created.",
        data: planning,
      }
    }

    return plan;
  }

  async findById(id: string) {
    const planning = await this.planningModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getPlanningById error', err)
      });

    if (!planning) {
      throw new HttpException('Planning Not found 56', HttpStatus.NOT_FOUND);
    }

    return planning;
  }

  async findAll() {
    const plannings = await this.planningModel.find().populate(['ranges', 'user'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: plannings,
    }
  }

  async update(id: string, updatePlanningDto: UpdatePlanningDto) {
    const planning = await this.findById(id)
    if (!planning) {
      throw new HttpException('Planning Not found', HttpStatus.NOT_FOUND);
    }
    await this.planningModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updatePlanningDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Planning error', error)
        return error;
      })
      
    const newPlanning = await this.findById(id)

    return {
      status: 'success',
      message: `Planning ${newPlanning.description} successfully updated.`,
      data: newPlanning,
    }
  }

  async remove(id: string) {
    const planning = await this.findById(id)
    if (!planning) {
      throw new HttpException('Planning Not found', HttpStatus.NOT_FOUND);
    }
    await this.planningModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Planning successfully deleted.",
    }
  }
}
