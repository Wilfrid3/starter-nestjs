import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res, 
  UseGuards} from '@nestjs/common';
import { SeedProducerService } from './seed-producer.service';
import { CreateSeedProducerDto } from './dto/create-seed-producer.dto';
import { UpdateSeedProducerDto } from './dto/update-seed-producer.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('seed-producer')
export class SeedProducerController {
  constructor(private readonly seedProducerService: SeedProducerService) {}

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
  create(@Body() createSeedProducerDto: CreateSeedProducerDto, @UploadedFile() file: Express.Multer.File) {
    return this.seedProducerService.create(createSeedProducerDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.seedProducerService.findAll();
  }

  @Get('/images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images' }); 
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.seedProducerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.seedProducerService.findByUser(id);
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
  update(@Param('id') id: string, @Body() updateSeedProducerDto: UpdateSeedProducerDto, @UploadedFile() file: Express.Multer.File) {
    return this.seedProducerService.update(id, updateSeedProducerDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.seedProducerService.remove(id);
  }
}
