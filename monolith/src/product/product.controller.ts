import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  NotFoundException,
  Query,
} from '@nestjs/common';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { UpdateProductDto } from './dto/update-product.dto';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('ping-product')
  ping() {
    console.log('ping-product');
    return this.productService.ping();
  }

  @Post()
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }

  @Get()
  getPaginated(
    @Query('skip') skip = 0,
    @Query('take') take = 10,
  ): Promise<Product[]> {
    return this.productService.getPaginated(take, skip);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Product> {
    const product = this.productService.findOne(+id);

    if (!product) {
      throw new NotFoundException();
    }

    return product;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productService.delete(+id);
  }
}
