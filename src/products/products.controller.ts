import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res,
  UseGuards,
  UploadedFiles
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';


const pngFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(new Error('Only image files are allowed!'), false);
  }
  return callback(null, true);
};

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    })
  }
  )
  )
  create(@Body() createProductDto: CreateProductDto, @UploadedFiles() files) {
    return this.productsService.create(createProductDto, files);
  }

  @Get('images/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images' });
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Get('by-store/:id')
  findByStore(@Param('id') id: string) {
    return this.productsService.findByStore(id);
  }

  @Get('search/:name')
  findByName(@Param('name') name: string) {
    return this.productsService.findByName(name);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    }),
    fileFilter: pngFileFilter,
  }
  )
  )
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto, @UploadedFiles() files) {
    return this.productsService.update(id, updateProductDto, files);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
