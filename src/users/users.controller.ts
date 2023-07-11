import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Get,
  HttpException, HttpStatus,
  UploadedFile,
  UseInterceptors,
  StreamableFile,
  Response,
  Res,
  UseGuards  
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from '../auth/local-auth.guards';
import { JwtAuthGuard } from '../auth/jwt-auth.guards';
import { Express } from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { CreateAdminDto } from './dto/create-admin.dto';
import { GeneratedToken } from './dto/generated-token.dto';
import { AddServiceDto } from './dto/add-service.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);
    if(res.status === 400){
      throw new HttpException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Check name and phone, then try again.',
      }, HttpStatus.BAD_REQUEST);
    }
    return res;
  }

  @Post('add-service')
  addService(@Body() addServiceDto: AddServiceDto) {
    return this.usersService.addService(addServiceDto);
  }

  @Post('admin')
  CreateAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Post('verify-phone')
  verifyPhone(@Body() body: any) {
    return this.usersService.checkPhoneVerificationCode(body.phone, body.code);
  }

  @Post('request-verification-code')
  requestCode(@Body() body: any) {
    console.log('requestCode', body.phone);
    return this.usersService.sendPhoneVerificationCode(body.phone);
  }

  @Post('partner/request-verification-code')
  requestPartnerCode(@Body() body: any) {
    console.log('requestCode', body.phone);
    return this.usersService.sendPhoneVerificationPartnerCode(body.phone);
  }

  @Get('avatar/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/avatars'});
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update-profile/:id')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './images/avatars',
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          return cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }
  )
  )
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @UploadedFile() file: Express.Multer.File) {
    console.log(file)
    return this.usersService.update(id, updateUserDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:id')
  Find(@Param('id') id: string) {
    return this.usersService.getServices(id);
  }

  @Get('findByProfil/:profil')
  FindWithProfile(@Param('profil') profil: string) {
    return this.usersService.findAllWithProfile(profil);
  }

  @Patch('update-token/:id')
  updateToken(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.updateToken(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findUser/:id')
  getUserById(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('token/generated')
  generatedToken(@Body() generatedToken: GeneratedToken) {
    return this.usersService.generatedToken(generatedToken);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/main-category/:id')
  findMainCategories(@Param('id') id: string) {
    return this.usersService.findMainCategories(id);
  }

  @Get('get-all-users')
  FindAll() {
    return this.usersService.findAll();
  }

  @Get('get-users')
  FindAllUsers() {
    return this.usersService.FindAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('activated/:id')
  activatedUser(@Param('id') id: string) {
    return this.usersService.activatedUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('deactivated/:id')
  deactivatedUser(@Param('id') id: string) {
    return this.usersService.deactivatedUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find/:phone')
  getServices(@Param('phone') phone: string) {
    return this.usersService.getServices(phone);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete-user/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
