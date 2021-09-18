import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  private readonly logger = new Logger(ProductController.name);

  @MessagePattern({ cmd: 'ping' })
  ping() {
    return this.productService.ping();
  }

  @MessagePattern({ cmd: 'getPaginated' })
  getPaginated(
    @Payload() { skip, take }: { skip: number; take: number },
  ): Promise<Product[]> {
    this.logger.log(`getPaginated: skip=${skip}, take=${take}`);

    return this.productService.getPaginated(take, skip);
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() createProductDto: CreateProductDto): Promise<Product> {
    this.logger.log(`create: ${JSON.stringify(createProductDto)}`);

    return this.productService.create(createProductDto);
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload() { id }: { id: number }): Promise<Product> {
    this.logger.log(`findOne: id=${id}`);

    const product = await this.productService.findOne(id);
    return product ? product : null;
  }

  @MessagePattern({ cmd: 'update' })
  update(
    @Payload('id') id: string,
    @Payload() updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    this.logger.log(`update: ${JSON.stringify(updateProductDto)}`);

    return this.productService.update(+id, updateProductDto);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload('id') id: string) {
    this.logger.log(`delete: id=${id}`);

    return this.productService.delete(+id);
  }
}
