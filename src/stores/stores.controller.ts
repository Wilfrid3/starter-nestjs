import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res,
  UseGuards, } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateDeliveryStoreDto } from './dto/update-delivery-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images/stores',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  create(@Body() createStoreDto: CreateStoreDto, @UploadedFile() file: Express.Multer.File) {
    return this.storesService.create(createStoreDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.storesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.storesService.findByUser(id);
  }

  @Get('images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/stores'});
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images/stores',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto, @UploadedFile() file: Express.Multer.File) {
    return this.storesService.update(id, updateStoreDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delivery/:id')
  delivery(@Param('id') id: string, @Body() updateStoreDto: UpdateDeliveryStoreDto) {
    return this.storesService.updateDelivery(id, updateStoreDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(id);
  }
}
