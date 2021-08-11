import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { ProductOptions } from './product.options';
import { ProductController } from './product.controller';

@Module({
  imports: [ClientsModule.register([ProductOptions])],
  controllers: [ProductController],
})
export class ProductModule {}
