import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CreateDayDto } from './dto/create-day.dto';
import { UpdateDayDto } from './dto/update-day.dto';
import { DayDocument, Day } from './schemas/day.schema';

@Injectable()
export class DaysService {

  constructor(@InjectModel(Day.name) private dayModel: Model<DayDocument>) { }

  async create(createDayDto: CreateDayDto) {
    const day = new this.dayModel(createDayDto)
    await day.save();

    return {
      status: "success",
      message: "Day successfully created.",
      data: day,
    }
  }

  async findAll() {
    const days = await this.dayModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: days,
    }
  }

  async findById(id: string) {
    const day = await this.dayModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDayById error', err)
      });

    if (!day) {
      throw new HttpException('Day Not found 56', HttpStatus.NOT_FOUND);
    }

    return day;
  }

  async update(id: string, updateDayDto: UpdateDayDto) {
    const day = await this.findById(id)
    if (!day) {
      throw new HttpException('Day Not found', HttpStatus.NOT_FOUND);
    }
    await this.dayModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateDayDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Day error', error)
        return error;
      })

    const newDay = await this.findById(id)

    return {
      status: 'success',
      message: `Day ${newDay.name} successfully updated.`,
      data: newDay,
    }
  }

  async remove(id: string) {
    const day = await this.findById(id)
    if (!day) {
      throw new HttpException('Planning Not found', HttpStatus.NOT_FOUND);
    }
    await this.dayModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Day successfully deleted.",
    }
  }
}
