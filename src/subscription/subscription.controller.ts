import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guards';
import { CreateBillingDto } from './dto/create-billing.dto';

@Controller('subscription')
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.create(createSubscriptionDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('billing-disease')
  billing(@Body() createBillingDto: CreateBillingDto) {
    return this.subscriptionService.billing(createBillingDto);
  }

  @Patch('confirmed/:id')
  confirmed(@Param('id') id: string) {
    return this.subscriptionService.confirmedSubscription(id);
  }

  @Get('by-credit/:id')
  findCredit(@Param('id') id: string) {
    return this.subscriptionService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all/by-user/:id')
  findAllByUser(@Param('id') id: string) {
    return this.subscriptionService.findAllByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('by-user/:id')
  findAll(@Param('id') id: string) {
    return this.subscriptionService.findByUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subscriptionService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.update(+id, updateSubscriptionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subscriptionService.remove(+id);
  }
}
