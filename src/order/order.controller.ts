import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFiles, Res } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { extname } from 'path';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NotifyOrderDto } from './dto/notify-order.dto';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: './images/orders/items',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      },
    })
  }
  )
  )
  create(@Body() createOrderDto: CreateOrderDto, @UploadedFiles() files) {
    return this.orderService.create(createOrderDto, files);
  }

  @Get('image/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'images/orders/items' });
  }

  @Post('send-notification')
  sendSMS(@Body() notifyOrderDto: NotifyOrderDto) {
    return this.orderService.sendSMS(notifyOrderDto.to, notifyOrderDto.message, notifyOrderDto.title);
  }

  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findById(id);
  }

  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.orderService.findByUser(id);
  }

  @Get('by-store/:id')
  findByStore(@Param('id') id: string) {
    return this.orderService.findByStore(id);
  }

  @Get('by-vehicle/:id')
  findByVehicle(@Param('id') id: string) {
    return this.orderService.findByVehicle(id);
  }

  @Get('by-transporter/:id')
  findByTransporter(@Param('id') id: string) {
    return this.orderService.findByTransporter(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats-vehicle/:id')
  findStatsByVehicle(@Param('id') id: string) {
    return this.orderService.findStatsByVehicle(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/:id')
  findStatsByStore(@Param('id') id: string) {
    return this.orderService.findStatsByStore(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats/by-user/:id')
  findStatsByUser(@Param('id') id: string) {
    return this.orderService.findStatsByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(id, updateOrderDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('accepted/:id')
  accepted(@Param('id') id: string) {
    return this.orderService.acceptedOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('canceled/:id')
  canceled(@Param('id') id: string) {
    return this.orderService.canceledOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('received/:id')
  received(@Param('id') id: string) {
    return this.orderService.receivedOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('rejected/:id')
  rejected(@Param('id') id: string) {
    return this.orderService.rejectedOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delivered/:id')
  delivered(@Param('id') id: string) {
    return this.orderService.deliveredOrder(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
