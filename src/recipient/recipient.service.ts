import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRecipientDto } from './dto/create-recipient.dto';
import { UpdateRecipientDto } from './dto/update-recipient.dto';
import { Recipient, RecipientDocument } from './schemas/recipient.schema';

@Injectable()
export class RecipientService {

  constructor(@InjectModel(Recipient.name) private recipientModel: Model<RecipientDocument>) { }

  async create(createRecipientDto: CreateRecipientDto) {
    const plantType = new this.recipientModel(createRecipientDto)
    await plantType.save();

    return {
      status: "success",
      message: "Recipient successfully created.",
      data: plantType,
    }
  }

  async findAll() {
    const recipients = await this.recipientModel.find().exec()
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      });
    let res = [];
    if (recipients.length > 0) {
      await Promise.all(recipients.map(async (elem) => {
        res.push({ label: elem.name, value: elem._id });
      }));
    }

    return {
      status: 'success',
      data: res,
    };
  }

  async findById(id: string) {
    const recipient = await this.recipientModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getRecipientById error', err)
      });

    if (!recipient) {
      throw new HttpException('Recipient Not found 56', HttpStatus.NOT_FOUND);
    }

    return recipient;
  }

  async findOne(id: string) {
    const recipient = await this.recipientModel.findById(id).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getRecipientById error', err)
      });

    if (!recipient) {
      throw new HttpException('Recipient Not found 56', HttpStatus.NOT_FOUND);
    }

    return recipient;
  }

  async update(id: string, updateRecipientDto: UpdateRecipientDto) {
    const recipient = await this.findById(id)
    if (!recipient) {
      throw new HttpException('Recipient Not found', HttpStatus.NOT_FOUND);
    }
    await this.recipientModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateRecipientDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update Recipient error', error)
        return error;
      })

    const newRecipient = await this.findById(id)

    return {
      status: 'success',
      message: `Recipient ${newRecipient.name} successfully updated.`,
      data: newRecipient,
    }
  }

  async remove(id: string) {
    const recipient = await this.findById(id)
    if (!recipient) {
      throw new HttpException('Recipient Not found', HttpStatus.NOT_FOUND);
    }
    await this.recipientModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Recipient successfully deleted.",
    }
  }
}
