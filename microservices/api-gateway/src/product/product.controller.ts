import { map } from 'rxjs/operators';
import { ClientProxy } from '@nestjs/microservices';
import { Controller, Get, Inject } from '@nestjs/common';

import { PRODUCT_SERVICE } from './product.options';

@Controller('product')
export class ProductController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productClient: ClientProxy,
  ) {}

  @Get('/ping-product')
  pingProductService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.productClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }
}
