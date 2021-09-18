import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const PRODUCT_SERVICE = 'PRODUCT_SERVICE';

export const ProductOptions: ClientProviderOptions = {
  name: PRODUCT_SERVICE,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4001,
  },
};
