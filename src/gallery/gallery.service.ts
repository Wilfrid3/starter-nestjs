import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Gallery, GalleryDocument } from './schemas/gallery.schema';
import { Model } from 'mongoose';
import { LaboratoriesService } from '../laboratories/laboratories.service';
import { AgroExpertService } from '../agro-expert/agro-expert.service';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel(Gallery.name) private galleryModel: Model<GalleryDocument>,
    private readonly laboratoryService: LaboratoriesService,
    private readonly expertService: AgroExpertService
  ) {}

  async create(createGalleryDto: CreateGalleryDto, file: Express.Multer.File) {
    if(!file){
      throw new HttpException('File Not found 56', HttpStatus.NOT_FOUND);
    }
    let laboratory = null;
    let expert = null;
    if(createGalleryDto.laboratory){
      laboratory = await this.laboratoryService.findById(createGalleryDto.laboratory);
    }
    if(createGalleryDto.expert){
      expert = await this.expertService.findById(createGalleryDto.expert);
    }
    createGalleryDto['image'] = file.path.split("/")[2];
    const gallery = new this.galleryModel(createGalleryDto);
    if(expert != null){
      gallery.expert = expert._id;
      expert.gallery.push(gallery._id);
      await expert.save();
    }
    if(laboratory != null){
      gallery.laboratory = laboratory._id;
      laboratory.gallery.push(gallery._id);
      await laboratory.save();
    }
    
    await gallery.save();

    return {
      status: "success",
      message: "Gallery successfully created.",
      data: gallery,
    }
  }

  async findAllForExpert(id: string) {
    const galleries = await this.galleryModel.find({ 'expert': { $in: id } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: galleries,
    }
  }

  async findAll(id: string) {
    const galleries = await this.galleryModel.find({ 'laboratory': { $in: id } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: galleries,
    }
  }

  findOne(id: string) {
    return `This action returns a #${id} gallery`;
  }

  async findById(id: string) {
    const gallery = await this.galleryModel.findById(id).populate(['laboratory', 'expert'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getGalleryById error', err)
      });

    if (!gallery) {
      throw new HttpException('Gallery Not found 56', HttpStatus.NOT_FOUND);
    }

    return gallery;
  }

  async update(id: string, updateGalleryDto: UpdateGalleryDto, file: Express.Multer.File) {
    if(!file){
      throw new HttpException('Gallery Not found', HttpStatus.NOT_FOUND);
    }
    updateGalleryDto['image'] = file.path.split("/")[2];

    const gallery = await this.findById(id)
    if (!gallery) {
      throw new HttpException('Gallery Not found', HttpStatus.NOT_FOUND);
    }
    const updateGallery = await this.galleryModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateGalleryDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update gallery error', error)
        return error;
      });

    const newGallery = await this.findById(id)

    return {
      status: 'success',
      message: `Gallery ${newGallery.title} successfully updated.`,
      data: newGallery,
    }
  }

  async remove(id: string) {
    const gallery = await this.findById(id)
    if (!gallery) {
      throw new HttpException('Gallery Not found', HttpStatus.NOT_FOUND);
    }
    await this.galleryModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Gallery successfully deleted.",
    }
  }
}
