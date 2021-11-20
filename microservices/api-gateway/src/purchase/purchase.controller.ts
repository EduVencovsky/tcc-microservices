import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { CreatePurchaseDto, UpdatePurchaseDto } from './purchase.interface';

import { PURCHASE_SERVICE } from './purchase.options';

@Controller('purchase')
export class PurchaseController {
  constructor(
    @Inject(PURCHASE_SERVICE) private readonly purchaseClient: ClientProxy,
  ) {}

  private readonly logger = new Logger(PurchaseController.name);

  @Get('/ping-purchase')
  pingPurchaseService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.purchaseClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto) {
    this.logger.log(`create: ${JSON.stringify(createPurchaseDto)}`);
    const payload = createPurchaseDto;
    const pattern = { cmd: 'create' };

    return this.purchaseClient.send(pattern, payload);
  }

  @Get('findAll/:userId')
  findAll(@Param('userId') userId: string) {
    this.logger.log(`findAll`);

    const payload = { userId };
    const pattern = { cmd: 'findAll' };

    return this.purchaseClient.send(pattern, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`findOne: id=${id}`);

    const payload = { id };
    const pattern = { cmd: 'findOne' };

    return this.purchaseClient.send(pattern, payload);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    this.logger.log(
      `update: id=${id}, updatePurchaseDto=${JSON.stringify(
        updatePurchaseDto,
      )}`,
    );

    const payload = { id, ...updatePurchaseDto };
    const pattern = { cmd: 'update' };

    return this.purchaseClient.send(pattern, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log(`delete: id=${id}`);

    const payload = { id };
    const pattern = { cmd: 'delete' };
    return this.purchaseClient.send(pattern, payload);
  }
}
