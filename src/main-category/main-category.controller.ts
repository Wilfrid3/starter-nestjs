import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res, 
  UseGuards} from '@nestjs/common';
import { MainCategoryService } from './main-category.service';
import { CreateMainCategoryDto } from './dto/create-main-category.dto';
import { UpdateMainCategoryDto } from './dto/update-main-category.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('main-category')
export class MainCategoryController {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

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
  create(@Body() createMainCategoryDto: CreateMainCategoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.mainCategoryService.create(createMainCategoryDto, file);
  }

  @Get('images/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images'});
  }

  @Get()
  findAll() {
    return this.mainCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mainCategoryService.findById(id);
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
  update(@Param('id') id: string, @Body() updateMainCategoryDto: UpdateMainCategoryDto, @UploadedFile() file: Express.Multer.File) {
    return this.mainCategoryService.update(id, updateMainCategoryDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.mainCategoryService.remove(id);
  }
}
