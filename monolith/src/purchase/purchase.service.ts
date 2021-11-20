import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Purchase } from './entities/purchase.entity';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { PurchaseQuantity } from './entities/purchase-quanitty.entity';

@Injectable()
export class PurchaseService {
  constructor(
    @InjectRepository(Purchase)
    private repository: Repository<Purchase>,
    @InjectRepository(PurchaseQuantity)
    private purchaseQuantityRepository: Repository<PurchaseQuantity>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const purchase = this.repository.create({
      user: { id: createPurchaseDto.userId },
    });

    await this.repository.save(purchase);

    const productQuantity = createPurchaseDto.productQuantity.map(
      ({ productId, quantity }) =>
        this.purchaseQuantityRepository.save({
          purchase,
          quantity: quantity,
          product: { id: productId },
        }),
    );

    await Promise.all(productQuantity);

    return purchase;
  }

  findAll(userId: string): Promise<Purchase[]> {
    return this.repository.find({
      where: { user: { id: userId } },
      relations: ['productQuantity', 'productQuantity.product'],
    });
  }

  findOne(id: number): Promise<Purchase> {
    return this.repository.findOne(id, {
      relations: ['productQuantity', 'productQuantity.product'],
    });
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase | null> {
    const purchase = await this.repository.findOne(id);

    if (!purchase) return null;

    await this.purchaseQuantityRepository.delete({ purchase: { id } });

    const productQuantity = updatePurchaseDto.productQuantity.map(
      ({ productId, quantity }) =>
        this.purchaseQuantityRepository.save({
          purchase,
          quantity: quantity,
          product: { id: productId },
        }),
    );

    await Promise.all(productQuantity);

    return purchase;
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}
