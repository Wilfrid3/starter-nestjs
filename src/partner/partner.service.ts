import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import { Model } from 'mongoose';
import { Partner, PartnerDocument } from './schemas/partner.schema';

@Injectable()
export class PartnerService {
  constructor(
    @InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>
  ) { }

  async create(createPartnerDto: CreatePartnerDto, file: Express.Multer.File) {
    if (file) {
      createPartnerDto['image'] = file.path.split("/")[1];
    }

    const partner = new this.partnerModel(createPartnerDto);
    await partner.save();

    return {
      status: "success",
      message: "Partner successfully created.",
      data: partner,
    }
  }

  async findAll() {
    const partners = await this.partnerModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: partners,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} partner`;
  }

  update(id: number, updatePartnerDto: UpdatePartnerDto) {
    return `This action updates a #${id} partner`;
  }

  remove(id: number) {
    return `This action removes a #${id} partner`;
  }
}
