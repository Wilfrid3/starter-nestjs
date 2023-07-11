import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res, 
  UseGuards} from '@nestjs/common';
import { AgroExpertService } from './agro-expert.service';
import { CreateAgroExpertDto } from './dto/create-agro-expert.dto';
import { UpdateAgroExpertDto } from './dto/update-agro-expert.dto';
import { AddUserToAgroexpertDto } from './dto/add-user-to-agroexpert.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('agro-expert')
export class AgroExpertController {
  constructor(private readonly agroExpertService: AgroExpertService) {}

  
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
  create(@Body() createAgroExpertDto: CreateAgroExpertDto, @UploadedFile() file: Express.Multer.File) {
    return this.agroExpertService.create(createAgroExpertDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.agroExpertService.findAll();
  }

  @Get('/images/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images' });
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/add-user/:id')
  addUser(@Param('id') id: string, @Body() addUserToAgroexpertDto: AddUserToAgroexpertDto) {
    return this.agroExpertService.addUserToAgroExpert(id, addUserToAgroexpertDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agroExpertService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.agroExpertService.findByUser(id);
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
  update(@Param('id') id: string, @Body() updateAgroExpertDto: UpdateAgroExpertDto, @UploadedFile() file: Express.Multer.File) {
    return this.agroExpertService.update(id, updateAgroExpertDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agroExpertService.remove(id);
  }
}
