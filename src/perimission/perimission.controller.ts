import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PerimissionService } from './perimission.service';
import { CreatePerimissionDto } from './dto/create-perimission.dto';
import { UpdatePerimissionDto } from './dto/update-perimission.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('permission')
export class PerimissionController {
  constructor(private readonly perimissionService: PerimissionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createPerimissionDto: CreatePerimissionDto) {
    return this.perimissionService.create(createPerimissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.perimissionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.perimissionService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePerimissionDto: UpdatePerimissionDto) {
    return this.perimissionService.update(id, updatePerimissionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.perimissionService.remove(id);
  }
}
