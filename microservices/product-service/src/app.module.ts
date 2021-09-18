import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

import { ProductModule } from './product/product.module';

@Module({
  imports: [ProductModule, DatabaseModule],
})
export class AppModule {}
