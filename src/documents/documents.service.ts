import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SheetService } from 'src/sheet/sheet.service';
import { Transaction, TransactionDocument } from 'src/transaction/schemas/transaction.schema';
import { UsersService } from 'src/users/users.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Documents, DocumentsDocument } from './schemas/document.schema';
import { Model } from 'mongoose';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectModel(Documents.name) private documentModel: Model<DocumentsDocument>,
    @InjectModel(Transaction.name) private transactionModel: Model<TransactionDocument>,
    private readonly usersService: UsersService,
    private readonly sheetService: SheetService
  ) { }

  async create(createDocumentDto: CreateDocumentDto) {
    const user = await this.usersService.findById(createDocumentDto.user);
    const sheet = await this.sheetService.findById(createDocumentDto.sheet);
    const document = new this.documentModel(createDocumentDto)
    document.user = user._id
    document.sheet = sheet._id
    await document.save();

    console.log({ document: document._id, status: 1, ref: createDocumentDto.transaction, user: user._id, amount: sheet.price, libelle: "Buy Document " + sheet.title + " from Kalio Partner" });
    const transaction = new this.transactionModel({ document: document._id, type: 3, status: 1, ref: createDocumentDto.transaction, user: user._id, amount: sheet.price, libelle: "Buy Document " + sheet.title + " from Kalio Partner" });
    await transaction.save();

    return {
      status: "success",
      message: "Document successfully created.",
      data: document,
    }
  }

  async findAllDoc() {
    const documents = await this.documentModel.find().sort({ 'createdAt': -1 }).populate(['user', 'sheet'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDocumentsByUser error', err)
      });

    return {
      status: "success",
      data: documents,
    }
  }

  async findAll(id: string) {
    const documents = await this.documentModel.find({ $and: [{ 'user': { $in: id } }, { 'status': { $in: 2 } }] }).sort({ 'createdAt': -1 }).populate(['user', 'sheet'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDocumentsByUser error', err)
      });

    return {
      status: "success",
      data: documents,
    }
  }

  async confirmedDocument(id: string) {
    const transaction = await this.transactionModel.findOne({ 'ref': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getTransactionByOrder error', err)
      });

    if (!transaction) {
      throw new HttpException('Transaction Not found', HttpStatus.NOT_FOUND);
    }
    transaction.status = 2;
    transaction.save();

    const document = await this.documentModel.findOne({ 'transaction': { $in: id } }).exec()
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getDocumentByOrder error', err)
      });

    if (!document) {
      throw new HttpException('subscription Not found', HttpStatus.NOT_FOUND);
    }
    document.status = 2;
    document.save();

    return {
      status: 'success',
      message: `Document successfully confirmed.`,
      data: document,
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} document`;
  }

  update(id: number, updateDocumentDto: UpdateDocumentDto) {
    return `This action updates a #${id} document`;
  }

  remove(id: number) {
    return `This action removes a #${id} document`;
  }
}
