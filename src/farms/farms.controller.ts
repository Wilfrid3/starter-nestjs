import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { CreateFarmDto } from './dto/create-farm.dto';
import { UpdateFarmDto } from './dto/update-farm.dto';
import { AddUserToFarmDto } from './dto/add-user-to-farm.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { RemoveUserFromFarmDto } from './dto/remove-user-from-farm.dto';
import { UpdateUserInFarmDto } from './dto/update-user-in-farm.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('farms')
export class FarmsController {
  constructor(private readonly farmsService: FarmsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createFarmDto: CreateFarmDto) {
    return this.farmsService.create(createFarmDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.farmsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user-farms/:userId')
  findUserFarms(@Param('userId') id: string) {
    return this.farmsService.findUserFarms(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('find-list/:userId')
  findUserFarmsList(@Param('userId') id: string) {
    return this.farmsService.findList(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('fetch-users/:farmId')
  findFarmUsers(@Param('farmId') id: string) {
    return this.farmsService.findFarmUsers(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFarmDto: UpdateFarmDto) {
    return this.farmsService.update(id, updateFarmDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/add-user/:id')
  addUser(@Param('id') id: string, @Body() createUserDto: CreateUserDto, @Body() addUserToFarmDto: AddUserToFarmDto) {
    return this.farmsService.addUserToFarm(id, createUserDto, addUserToFarmDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/update-user/:farmId/:userId')
  updateUserInFarm(@Param('farmId') farmId: string, @Param('userId') userId: string, @Body() dto: UpdateUserInFarmDto) {
    return this.farmsService.updateUserInFarm(farmId, userId, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/remove-user/:id')
  removeUser(@Param('id') id: string, @Body() removeUserFromFarmDto: RemoveUserFromFarmDto) {
    return this.farmsService.removeUserFromFarm(id, removeUserFromFarmDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmsService.remove(id);
  }
}
