import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;
  }

  getPaginated(take: number, skip: number): Promise<Product[]> {
    return this.productRepository.find({ skip, take });
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: number): Promise<Product> {
    return this.productRepository.findOne(id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    return this.productRepository.save({ ...updateProductDto, id });
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }

  ping() {
    return 'Product Pong';
  }
}
