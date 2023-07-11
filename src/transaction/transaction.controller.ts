import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { NotifyTransactionDto } from './dto/notify-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { CreditTransactionDto } from './dto/credit-transaction.dto';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(createTransactionDto);
  }

  @Post('credit-account')
  credit(@Body() creditTransactionDto: CreditTransactionDto) {
    return this.transactionService.creditAccount(creditTransactionDto);
  }

  @Post('notify')
  notifyPayment(@Body() notifyTransactionDto: NotifyTransactionDto) {
    return this.transactionService.notifyPayment(notifyTransactionDto);
  }

  @Get('notify/:id')
  findByRef(@Param('id') id: string) {
    return this.transactionService.findByRef(id);
  }

  @Get('verification-withdraw/:amount/:id')
  verificationAmountToWithdraw(@Param('amount') amount: string, @Param('id') id: string) {
    return this.transactionService.verificationAmountToWithdraw(id, amount);
  }

  @Get('by-user/:id')
  findByUser(@Param('id') id: string) {
    return this.transactionService.findByUser(id);
  }

  @Get('pending-transaction/:id')
  findPendingAmount(@Param('id') id: string) {
    return this.transactionService.findPendingAmount(id);
  }

  @Get('completed-transaction/:id')
  findCompletedAmount(@Param('id') id: string) {
    return this.transactionService.findCompletedAmount(id);
  }

  @Get()
  findAll() {
    return this.transactionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transactionService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTransactionDto: UpdateTransactionDto) {
    return this.transactionService.update(id, updateTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionService.remove(id);
  }
}
