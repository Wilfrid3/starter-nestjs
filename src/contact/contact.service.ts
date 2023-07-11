import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Model } from 'mongoose'; 
import { Contact, ContactDocument } from './schemas/contact.schema';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(Contact.name) private contactModel: Model<ContactDocument>
  ) { }

  async create(createContactDto: CreateContactDto) {
    const contact = new this.contactModel(createContactDto);
    await contact.save();

    return {
      status: "success",
      message: "Contact successfully added.",
      data: contact,
    }
  }

  async findAll() {
    const contacts = await this.contactModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: contacts,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} contact`;
  }

  update(id: number, updateContactDto: UpdateContactDto) {
    return `This action updates a #${id} contact`;
  }

  remove(id: number) {
    return `This action removes a #${id} contact`;
  }
}
