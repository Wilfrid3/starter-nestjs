import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TypePostService } from './type-post.service';
import { CreateTypePostDto } from './dto/create-type-post.dto';
import { UpdateTypePostDto } from './dto/update-type-post.dto';

@Controller('type-post')
export class TypePostController {
  constructor(private readonly typePostService: TypePostService) {}

  @Post()
  create(@Body() createTypePostDto: CreateTypePostDto) {
    return this.typePostService.create(createTypePostDto);
  }

  @Get()
  findAll() {
    return this.typePostService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.typePostService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTypePostDto: UpdateTypePostDto) {
    return this.typePostService.update(id, updateTypePostDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.typePostService.remove(id);
  }
}
