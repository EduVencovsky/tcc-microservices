import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Logger,
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) {}

  private readonly logger = new Logger(PurchaseController.name);

  @MessagePattern({ cmd: 'ping' })
  ping() {
    return this.purchaseService.ping();
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() createPurchaseDto: CreatePurchaseDto) {
    return this.purchaseService.create(createPurchaseDto);
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll(@Payload('userId') userId: string) {
    return this.purchaseService.findAll(userId);
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload('id') id: string) {
    return (await this.purchaseService.findOne(+id)) || null;
  }

  @MessagePattern({ cmd: 'update' })
  update(
    @Payload('id') id: string,
    @Payload() updatePurchaseDto: UpdatePurchaseDto,
  ) {
    return this.purchaseService.update(+id, updatePurchaseDto);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload('id') id: string) {
    return this.purchaseService.delete(+id);
  }
}
