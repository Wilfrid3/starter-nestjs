import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';

@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto) {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  findAll() {
    return this.invoiceService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.invoiceService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-order/:id')
  findByOrder(@Param('id') id: string) {
    return this.invoiceService.findByOrder(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.invoiceService.findById(id);
  }

  @Patch('rejected/:id')
  rejected(@Param('id') id: string) {
    return this.invoiceService.rejectedInvoice(id);
  }

  @Patch('canceled/:id')
  canceled(@Param('id') id: string) {
    return this.invoiceService.canceledInvoice(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInvoiceDto: UpdateInvoiceDto) {
    return this.invoiceService.update(+id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.invoiceService.remove(+id);
  }
}
