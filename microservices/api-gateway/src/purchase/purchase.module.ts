import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { PurchaseController } from './purchase.controller';
import { PurchaseOptions } from './purchase.options';

@Module({
  imports: [ClientsModule.register([PurchaseOptions])],
  controllers: [PurchaseController],
  providers: [],
})
export class PurchaseModule {}
