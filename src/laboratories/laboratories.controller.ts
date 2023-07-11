import {
  Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LaboratoriesService } from './laboratories.service';
import { CreateLaboratoryDto } from './dto/create-laboratory.dto';
import { UpdateLaboratoryDto } from './dto/update-laboratory.dto';
import { AddUserToLaboratoryDto } from './dto/add-user-to-laboratory.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('laboratories')
export class LaboratoriesController {
  constructor(private readonly laboratoriesService: LaboratoriesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  create(@Body() createLaboratoryDto: CreateLaboratoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.laboratoriesService.create(createLaboratoryDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.laboratoriesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.laboratoriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.laboratoriesService.findByUser(id);
  }

  @Get('/images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/add-user/:id')
  addUser(@Param('id') id: string, @Body() addUserToLaboratoryDto: AddUserToLaboratoryDto) {
    return this.laboratoriesService.addUserToLaboratory(id, addUserToLaboratoryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  update(@Param('id') id: string, @Body() updateLaboratoryDto: UpdateLaboratoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.laboratoriesService.update(id, updateLaboratoryDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.laboratoriesService.remove(id);
  }
}
