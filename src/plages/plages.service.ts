import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePlageDto } from './dto/create-plage.dto';
import { UpdatePlageDto } from './dto/update-plage.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Range, RangeDocument } from './schemas/range.schema';
import { Planning, PlanningDocument } from '../planning/schemas/planning.schema';
import { Model } from 'mongoose';
import { PlanningService } from '../planning/planning.service';
import { DaysService } from '../days/days.service';

@Injectable()
export class PlagesService {

  constructor(
    @InjectModel(Range.name) private rangeModel: Model<RangeDocument>,
    @InjectModel(Planning.name) private planningModel: Model<PlanningDocument>,
    private readonly planningService: PlanningService,
    private readonly dayService: DaysService
  ) { }

  async create(createPlageDto: CreatePlageDto) {
    const planning = await this.planningService.findById(createPlageDto.planningId);
    const day = await this.dayService.findById(createPlageDto.dayId);
    const range = new this.rangeModel(createPlageDto)
    range.planning = planning._id
    range.day = day._id
    await range.save();

    planning.ranges.push(range._id);
    planning.save();

    return {
      status: "success",
      message: "Range successfully created.",
      data: range,
    }
  }

  async findById(id: string) {
    const range = await this.rangeModel.findById(id).populate(['day']).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getRangeById error', err)
      });

    if (!range) {
      throw new HttpException('Range Not found 56', HttpStatus.NOT_FOUND);
    }

    return range;
  }

  async findAll() {
    const ranges = await this.rangeModel.find().populate(['planning', 'day']).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: ranges,
    }
  }

  async changeStatus(id: string, status: number) {
    await this.rangeModel.updateOne({ _id: id }, {
      etat: status
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })
      return true;
  }

  async findByPlanning(id: string) {
    const ranges = await this.rangeModel.find({ 'planning': { $in: id }, 'etat': { $in: 1 }  }).populate('planning').exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: ranges,
    }
  }

  async findAllRanges(id: string) {
    const planning = await this.planningModel.findOne({ 'user': { $in: id } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })
      
      const ranges = await this.rangeModel.find({ 'planning': { $in: planning._id } }).exec()
      .then((result) => {
        return {
            planning: planning,
            ranges: result
        };
      }).catch((error) => {
        return error;
      })



    return {
      status: "success",
      data: ranges,
    }
  }

  async update(id: string, updatePlageDto: UpdatePlageDto) {
    const range = await this.findById(id)
    if (!range) {
      throw new HttpException('Range Not found', HttpStatus.NOT_FOUND);
    }
    await this.rangeModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updatePlageDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Range error', error)
        return error;
      })

    const newRange = await this.findById(id)

    return {
      status: 'success',
      message: `Range successfully updated.`,
      data: newRange,
    }
  }

  async remove(id: string) {
    const range = await this.findById(id)
    if (!range) {
      throw new HttpException('Range Not found', HttpStatus.NOT_FOUND);
    }
    await this.rangeModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Range successfully deleted.",
    }
  }
}
