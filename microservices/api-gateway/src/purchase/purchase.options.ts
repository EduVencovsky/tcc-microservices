import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const PURCHASE_SERVICE = 'PURCHASE_SERVICE';

export const PurchaseOptions: ClientProviderOptions = {
  name: PURCHASE_SERVICE,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 4003,
  },
};
