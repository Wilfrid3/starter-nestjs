import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category, CategoryDocument } from './schemas/category.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { MainCategoryService } from '../main-category/main-category.service';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,
    private readonly usersService: UsersService,
    private readonly maincategService: MainCategoryService
  ) { }

  async create(createCategoryDto: CreateCategoryDto, file: Express.Multer.File) {
    if (file) {
      createCategoryDto['image'] = file.path.split("/")[1];
    }
    const user = await this.usersService.findById(createCategoryDto.userId);
    const maincateg = await this.maincategService.findById(createCategoryDto.maincategory);
    const category = new this.categoryModel(createCategoryDto)
    category.user = user._id
    category.mainCategory = maincateg._id
    await category.save();

    maincateg.categories.push(category._id);
    maincateg.save();

    return {
      status: "success",
      message: "Category successfully created.",
      data: category,
    }
  }

  async findByMainCateg(id: string) {
    const maincateg = await this.maincategService.findByName(id);
    const categories = await this.categoryModel.find({ 'maincategory': { $in: maincateg._id } })
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })
      let categs = [];
      await Promise.all(categories.map(async (elem) => {
        categs.push({label: elem.name, value: elem._id});
      }));
    return {
      status: "success",
      data: categs,
    }
  }

  async findAll() {
    const categories = await this.categoryModel.find().populate(['user', 'products'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: categories,
    }
  }

  async findById(id: string) {
    const category = await this.categoryModel.findById(id).populate(['user', 'products'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getCategoryById error', err)
      });

    if (!category) {
      throw new HttpException('Category Not found 56', HttpStatus.NOT_FOUND);
    }

    return category;
  }

  findOne(id: string) {
    return `This action returns a #${id} category`;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file: Express.Multer.File) {
    if (file) {
      updateCategoryDto['image'] = file.path.split("/")[1];
    }
    const category = await this.findById(id)
    if (!category) {
      throw new HttpException('Category Not found', HttpStatus.NOT_FOUND);
    }
    const categoryUpdate = await this.categoryModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateCategoryDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update category error', error)
        return error;
      })

    if (updateCategoryDto.maincategory) {
      const maincateg = await this.maincategService.findById(updateCategoryDto.maincategory);
      categoryUpdate.mainCategory = maincateg._id
    }

    categoryUpdate.save();


    const newCategory = await this.findById(id)

    return {
      status: 'success',
      message: `Category ${newCategory.name} successfully updated.`,
      data: newCategory,
    }
  }

  async remove(id: string) {
    const category = await this.findById(id)
    if (!category) {
      throw new HttpException('Category Not found', HttpStatus.NOT_FOUND);
    }
    await this.categoryModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Category successfully deleted.",
    }
  }
}
