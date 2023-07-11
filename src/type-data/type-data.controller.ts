import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypeDataService } from './type-data.service';
import { CreateTypeDatumDto } from './dto/create-type-datum.dto';
import { UpdateTypeDatumDto } from './dto/update-type-datum.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('type-data')
export class TypeDataController {
  constructor(private readonly typeDataService: TypeDataService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTypeDatumDto: CreateTypeDatumDto) {
    return this.typeDataService.create(createTypeDatumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.typeDataService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typeDataService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypeDatumDto: UpdateTypeDatumDto) {
    return this.typeDataService.update(id, updateTypeDatumDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typeDataService.remove(id);
  }
}
