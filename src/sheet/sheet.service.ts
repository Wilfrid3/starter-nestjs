import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Sheet, SheetDocument } from './schemas/sheet.schema';
import { Model } from 'mongoose';
import { LaboratoriesService } from '../laboratories/laboratories.service';
import { AgroExpertService } from '../agro-expert/agro-expert.service';

@Injectable()
export class SheetService {
  constructor(
    @InjectModel(Sheet.name) private sheetModel: Model<SheetDocument>,
    private readonly laboratoryService: LaboratoriesService,
    private readonly expertService: AgroExpertService
  ) {}

  async create(createSheetDto: CreateSheetDto, file: Express.Multer.File) {
    if(!file){
      throw new HttpException('File Not found 56', HttpStatus.NOT_FOUND);
    }
    let laboratory = null;
    let expert = null;
    if(createSheetDto.laboratory){
      laboratory = await this.laboratoryService.findById(createSheetDto.laboratory);
    }
    if(createSheetDto.expert){
      expert = await this.expertService.findById(createSheetDto.expert);
    }
    createSheetDto['document'] = file.path.split("/")[2];
    const sheet = new this.sheetModel(createSheetDto);
    if(expert != null){
      sheet.expert = expert._id;
      expert.sheets.push(sheet._id);
      await expert.save();
    }
    if(laboratory != null){
      sheet.laboratory = laboratory._id;
      laboratory.sheets.push(sheet._id);
      await laboratory.save();
    }
    
    await sheet.save();

    return {
      status: "success",
      message: "Sheet successfully created.",
      data: sheet,
    }
  }

  async findAllForExpert(id: string) {
    const sheets = await this.sheetModel.find({ 'expert': { $in: id } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: sheets,
    }
  }

  async findAllSheets() {
    const sheets = await this.sheetModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: sheets,
    }
  }

  async findAll(id: string) {
    const sheets = await this.sheetModel.find({ 'laboratory': { $in: id } }).exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: sheets,
    }
  }

  async findById(id: string) {
    const sheet = await this.sheetModel.findById(id).populate(['laboratory', 'expert'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getSheetById error', err)
      });

    if (!sheet) {
      throw new HttpException('Sheet Not found 56', HttpStatus.NOT_FOUND);
    }

    return sheet;
  }

  findOne(id: string) {
    return `This action returns a #${id} sheet`;
  }

  async update(id: string, updateSheetDto: UpdateSheetDto, file: Express.Multer.File) {
    if(!file){
      throw new HttpException('File Not found', HttpStatus.NOT_FOUND);
    }
    updateSheetDto['document'] = file.path.split("/")[2];

    const sheet = await this.findById(id)
    if (!sheet) {
      throw new HttpException('Sheet Not found', HttpStatus.NOT_FOUND);
    }
    const updateSheet = await this.sheetModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateSheetDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update sheet error', error)
        return error;
      });

    const newSheet = await this.findById(id)

    return {
      status: 'success',
      message: `Sheet ${newSheet.title} successfully updated.`,
      data: newSheet,
    }
  }

  async remove(id: string) {
    const sheet = await this.findById(id)
    if (!sheet) {
      throw new HttpException('Sheet Not found', HttpStatus.NOT_FOUND);
    }
    await this.sheetModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Sheet successfully deleted.",
    }
  }
}
