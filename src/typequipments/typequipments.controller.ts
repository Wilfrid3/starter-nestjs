import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TypequipmentsService } from './typequipments.service';
import { CreateTypequipmentDto } from './dto/create-typequipment.dto';
import { UpdateTypequipmentDto } from './dto/update-typequipment.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('typequipments')
export class TypequipmentsController {
  constructor(private readonly typequipmentsService: TypequipmentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTypequipmentDto: CreateTypequipmentDto) {
    return this.typequipmentsService.create(createTypequipmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.typequipmentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typequipmentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypequipmentDto: UpdateTypequipmentDto) {
    return this.typequipmentsService.update(id, updateTypequipmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typequipmentsService.remove(id);
  }
}
