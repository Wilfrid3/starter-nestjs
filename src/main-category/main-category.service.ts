import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MainCategory, MainCategoryDocument } from './schemas/main-category.schema';
import { Model } from 'mongoose';
import { ProfilService } from '../profil/profil.service';

@Injectable()
export class MainCategoryService {
  constructor(
    @InjectModel(MainCategory.name) private maincategModel: Model<MainCategoryDocument>,
    private readonly profilService: ProfilService
  ) {}

  async create(createMainCategoryDto: CreateMainCategoryDto, file: Express.Multer.File) {
    if(file){
      createMainCategoryDto['image'] = file.path.split("/")[1];
    }
    const maincategory = new this.maincategModel(createMainCategoryDto)
    const profils = JSON.parse(createMainCategoryDto.profils);
    await Promise.all(profils.map(async (elem) => {
      const profil = await this.profilService.findById(elem);
      profil.category = maincategory._id;
      await profil.save();
      maincategory.profil.push(profil._id);
    }));
    await maincategory.save();

    return {
      status: "success",
      message: "Main Category successfully created.",
      data: maincategory,
    }
  }

  async findAll() {
    const maincategories = await this.maincategModel.find().populate({
      path: 'categories',
      populate: {
        path: 'products',
        populate: {
          path: 'currency',
        },
      },
    }).populate({
      path: 'categories',
      populate: {
        path: 'products',
        populate: {
          path: 'store',
        },
      },
    }).populate({
      path: 'categories',
      populate: {
        path: 'products',
        populate: {
          path: 'unity',
        },
      },
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: maincategories,
    }
  }

  async findById(id: string) {
    const maincategory = await this.maincategModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getMainCategoryById error', err)
      });

    if(!maincategory){
      throw new HttpException('Main Category Not found 56', HttpStatus.NOT_FOUND);
    }

    return maincategory;
  }

  async findByName(name: string) {
    const main = await this.maincategModel.findOne({'name': { $in: name }}).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('findByName min', err)
      });

    if(!main){
      throw new HttpException('Main Not found', HttpStatus.NOT_FOUND);
    }

    return main
  }

  findOne(id: string) {
    return `This action returns a #${id} mainCategory`;
  }

  async update(id: string, updateMainCategoryDto: UpdateMainCategoryDto, file: Express.Multer.File) {
    if(file){
      updateMainCategoryDto['image'] = file.path.split("/")[1];
    }
    const maincategory = await this.findById(id)
    if(!maincategory){
      throw new HttpException('Category Not found', HttpStatus.NOT_FOUND);
    }
    const maincategUpdate = await this.maincategModel.findOneAndUpdate({_id: id}, {
      $set: { ...updateMainCategoryDto }
    })
      .then((result) =>{
        return result;
      }).catch((error) => {
        console.error('update category error', error)
        return error;
      })

      if(updateMainCategoryDto.profils){
        const profils = JSON.parse(updateMainCategoryDto.profils);
        profils.forEach(async (elem) => {
          maincategory.profil.length = 0;
          const profil = await this.profilService.findById(elem);
          maincategory.profil.push(profil._id);
        });
        maincategory.save();
      }

    const newCategory = await this.findById(id)

    return {
      status: 'success',
      message: `Category ${newCategory.name} successfully updated.`,
      data: newCategory,
    }
  }

  async remove(id: string) {
    const maincategory = await this.findById(id)
    if(!maincategory){
      throw new HttpException('Main Category Not found', HttpStatus.NOT_FOUND);
    }
    await this.maincategModel.findOneAndDelete({_id: id})
      .then((result) =>{
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Main Category successfully deleted.",
    }
  }
}
