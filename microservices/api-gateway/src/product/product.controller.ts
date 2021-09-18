import { ClientProxy } from '@nestjs/microservices';
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
  Query,
} from '@nestjs/common';

import { PRODUCT_SERVICE } from './product.options';
import { CreateProductDto, UpdateProductDto } from './product.interface';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  private readonly logger = new Logger(ProductController.name);

  @Get('/ping-product')
  pingProductService() {
    this.logger.log('ping-product');

    const payload = {};
    const pattern = { cmd: 'ping' };
    return this.productClient.send<string>(pattern, payload);
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    this.logger.log(`create: ${JSON.stringify(createProductDto)}`);
    const payload = createProductDto;
    const pattern = { cmd: 'create' };

    return this.productClient.send(pattern, payload);
  }

  @Get()
  getProductsPaginated(@Query('skip') skip = 0, @Query('take') take = 10) {
    this.logger.log(`getProductsPaginated: skip=${skip}, take=${take}`);

    const pattern = { cmd: 'getPaginated' };
    const payload = { skip, take };

    return this.productClient.send<string>(pattern, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`findOne: id=${id}`);

    const payload = { id };
    const pattern = { cmd: 'findOne' };

    return this.productClient.send(pattern, payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    this.logger.log(
      `update: id=${id}, updateProductDto=${JSON.stringify(updateProductDto)}`,
    );

    const payload = { id, ...updateProductDto };
    const pattern = { cmd: 'update' };

    return this.productClient.send(pattern, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log(`delete: id=${id}`);

    const payload = { id };
    const pattern = { cmd: 'delete' };
    return this.productClient.send(pattern, payload);
  }
}
