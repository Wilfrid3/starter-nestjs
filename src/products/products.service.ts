import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { Model } from 'mongoose';
import { UsersService } from '../users/users.service';
import { CategoryService } from '../category/category.service';
import { UnityService } from '../unity/unity.service';
import { CurrencyService } from '../currency/currency.service';
import { StoresService } from '../stores/stores.service';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { RecipientService } from 'src/recipient/recipient.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    private readonly usersService: UsersService,
    private readonly categoryService: CategoryService,
    private readonly unityService: UnityService,
    private readonly currencyService: CurrencyService,
    private readonly storeService: StoresService,
    private readonly recipientService: RecipientService
  ) { }

  async create(createProductDto: CreateProductDto, files) {
    console.log("Files ", files);
    // if(files?.length > 0){
    //   createProductDto['image'] = files['image'].path.split("/")[1];
    //   createProductDto['image1'] = files['image1'].path.split("/")[1];
    //   createProductDto['image2'] = files['image2'].path.split("/")[1];
    //   createProductDto['image3'] = files['image3'].path.split("/")[1];
    // }
    if (files) {
      files.forEach((item) => {
        createProductDto[item.fieldname] = item.filename;
      })
    }
    const user = await this.usersService.findById(createProductDto.userId);
    const category = await this.categoryService.findById(createProductDto.categoryId);
    const unity = await this.unityService.findById(createProductDto.unityId);
    const currency = await this.currencyService.findById(createProductDto.currencyId);
    const recipient = await this.recipientService.findById(createProductDto.recipientId);
    const store = await this.storeService.findById(createProductDto.store);
    const product = new this.productModel(createProductDto)
    product.category = category._id
    product.unity = unity._id
    product.currency = currency._id
    product.user = user._id
    product.store = store._id
    product.recipient = recipient._id
    await product.save();

    category.products.push(product._id);
    category.save();

    unity.products.push(product._id);
    unity.save();

    recipient.products.push(product._id);
    recipient.save();

    currency.products.push(product._id);
    currency.save();

    store.products.push(product._id);
    store.save();

    return {
      status: "success",
      message: "Product successfully created.",
      data: product,
    }
  }

  async findAll() {
    const products = await this.productModel.find().populate(['user', 'category', 'unity', 'currency', 'store', 'recipient'])
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: "success",
      data: products,
    }
  }

  async findByName(search: string) {
    const products = await this.productModel.find({ name: { $regex: search } }).populate(['user', 'category', 'unity', 'currency', 'recipient'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getProductById error', err)
      });

    if (!products) {
      throw new HttpException('Products Not found 56', HttpStatus.NOT_FOUND);
    }

    return {
      status: "success",
      data: products,
    }
  }

  async findByStore(id: string) {
    const products = await this.productModel.find({ 'store': { $in: id } }).sort({ 'createdAt': -1 }).populate(['user', 'category', 'unity', 'currency', 'store', 'recipient'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getProductsByStore error', err)
      });

    return {
      status: "success",
      data: products,
    }
  }

  async findById(id: string) {
    const product = await this.productModel.findById(id).populate(['user', 'category', 'unity', 'currency', 'recipient'])
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log('getProductById error', err)
      });

    if (!product) {
      throw new HttpException('Product Not found 56', HttpStatus.NOT_FOUND);
    }

    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto, file: Express.Multer.File) {
    if(file){
      updateProductDto['image'] = file.path.split("\\")[1];
    }

    const product = await this.findById(id)
    if (!product) {
      throw new HttpException('Category Not found', HttpStatus.NOT_FOUND);
    }
    const updateProduct = await this.productModel.findOneAndUpdate({ _id: id }, {
      $set: { ...updateProductDto }
    })
      .then((result) => {
        return result;
      }).catch((error) => {
        console.error('update product error', error)
        return error;
      })

    if (updateProductDto.categoryId) {
      const category = await this.categoryService.findById(updateProductDto.categoryId);
      updateProduct.category = category._id
    }
    if (updateProductDto.unityId) {
      const unity = await this.unityService.findById(updateProductDto.unityId);
      updateProduct.unity = unity._id
    }
    if (updateProductDto.currencyId) {
      const currency = await this.currencyService.findById(updateProductDto.currencyId);
      updateProduct.currency = currency._id
    }
    if (updateProductDto.store) {
      const store = await this.storeService.findById(updateProductDto.store);
      updateProduct.store = store._id
    }
    updateProduct.save();

    const newProduct = await this.findById(id)

    return {
      status: 'success',
      message: `Product ${newProduct.name} successfully updated.`,
      data: newProduct,
    }
  }

  async remove(id: string) {
    const product = await this.findById(id)
    if (!product) {
      throw new HttpException('Product Not found', HttpStatus.NOT_FOUND);
    }
    await this.productModel.findOneAndDelete({ _id: id })
      .then((result) => {
        return result;
      }).catch((error) => {
        return error;
      })

    return {
      status: 'success',
      message: "Product successfully deleted.",
    }
  }
}
