import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Get,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) { }

  @Post()
  create(@Body() createServiceDto: CreateServiceDto) {
    return this.servicesService.create(createServiceDto);
  }

  @Post('subscribe/:id/:id')
  subscribe(@Param('serviceId') serviceId, @Param('userId') userId) {
    return this.servicesService.subscribe(serviceId, userId);
  }

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
  update(@Param('id') id: string, @Body() updateServiceDto: UpdateServiceDto, @UploadedFile() file: Express.Multer.File) {
    return this.servicesService.update(id, updateServiceDto, file);
  }

  @Get('type/:type')
  findByType(@Param('type') type: string) {
    return this.servicesService.findByType(type);
  }

  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.servicesService.findByUser(id);
  }

  @Get('images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images'});
  }

  @Get()
  FindAll() {
    return this.servicesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.servicesService.remove(id);
  }
}
