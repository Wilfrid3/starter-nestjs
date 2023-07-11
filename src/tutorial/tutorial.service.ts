import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TypePostService } from 'src/type-post/type-post.service';
import { CreateTutorialDto } from './dto/create-tutorial.dto';
import { UpdateTutorialDto } from './dto/update-tutorial.dto';
import { Tutorial, TutorialDocument } from './schemas/Tutorial.schema';

@Injectable()
export class TutorialService {
  constructor(
    @InjectModel(Tutorial.name) private tutorialModel: Model<TutorialDocument>,
    private readonly typepostService: TypePostService
  ) { }

  async create(createTutorialDto: CreateTutorialDto) {
    const type = await this.typepostService.findById(createTutorialDto.typepostId);
    const tutorial = new this.tutorialModel(createTutorialDto);
    tutorial.typepost = type._id
    await tutorial.save()

    return {
      status: "success",
      message: "Tutorial successfully created.",
      data: tutorial,
    }
  }

  async findAll() {
    const tutorials = await this.tutorialModel.find().populate(['typepost'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: tutorials,
    }
  }

  async findById(id: string) {
    const tutorial = await this.tutorialModel.findById(id).populate(['typepost'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTutorialById error', err)
      });

    if (!tutorial) {
      throw new HttpException('Tutorial Not found 56', HttpStatus.NOT_FOUND);
    }

    return tutorial;
  }

  async findOne(id: string) {
    const tutorial = await this.tutorialModel.findById(id).populate(['typepost'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTutorialById error', err)
      });

    if (!tutorial) {
      throw new HttpException('Tutorial Not found 56', HttpStatus.NOT_FOUND);
    }

    return tutorial;
  }

  async update(id: string, updateTutorialDto: UpdateTutorialDto) {

    const tutorial = await this.findById(id)
    if (!tutorial) {
      throw new HttpException('Vehicle Not found', HttpStatus.NOT_FOUND);
    }
    const updateTutorial = await this.tutorialModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateTutorialDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update tutorial error', error)
        return error;
      })

    if (updateTutorialDto.typepostId) {
      const type = await this.typepostService.findById(updateTutorialDto.typepostId);
      updateTutorial.typepost = type._id
    }
    updateTutorial.save();

    const newTutorial = await this.findById(id)

    return {
      status: 'success',
      message: `Tutorial ${newTutorial.name} successfully updated.`,
      data: newTutorial,
    }
  }

  async remove(id: string) {
    const tutorial = await this.findById(id)
    if (!tutorial) {
      throw new HttpException('Tutorial Not found', HttpStatus.NOT_FOUND);
    }
    await this.tutorialModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Tutorial successfully deleted.",
    }
  }
}
