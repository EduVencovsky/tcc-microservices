import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {
  ping() {
    return 'Product Pong';
  }
}
