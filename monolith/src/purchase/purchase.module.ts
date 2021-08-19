import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PurchaseService } from './purchase.service';
import { Purchase } from './entities/purchase.entity';
import { PurchaseController } from './purchase.controller';
import { PurchaseQuantity } from './entities/purchase-quanitty.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, PurchaseQuantity])],
  controllers: [PurchaseController],
  providers: [PurchaseService],
})
export class PurchaseModule {}
