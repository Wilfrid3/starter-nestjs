import { Controller, Get, Post, Body, Patch, Param, Delete,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res,
  UseGuards, } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { CreateSheetDto } from './dto/create-sheet.dto';
import { UpdateSheetDto } from './dto/update-sheet.dto';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('sheet')
export class SheetController {
  constructor(private readonly sheetService: SheetService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images/documents',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  create(@Body() createSheetDto: CreateSheetDto, @UploadedFile() file: Express.Multer.File) {
    return this.sheetService.create(createSheetDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.sheetService.findAll(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllSheets() {
    return this.sheetService.findAllSheets();
  }

  @UseGuards(JwtAuthGuard)
  @Get('expert/:id')
  findAllForExpert(@Param('id') id: string) {
    return this.sheetService.findAllForExpert(id);
  }

  @Get('document/:fileId')
  async serveDocument(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/documents'});
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheetService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images/documents',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  update(@Param('id') id: string, @Body() updateSheetDto: UpdateSheetDto, @UploadedFile() file: Express.Multer.File) {
    return this.sheetService.update(id, updateSheetDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheetService.remove(id);
  }
}
