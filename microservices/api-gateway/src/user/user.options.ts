import { ClientProviderOptions, Transport } from '@nestjs/microservices';

export const USER_SERVICE = 'USER_SERVICE';

export const UserOptions: ClientProviderOptions = {
  name: USER_SERVICE,
  transport: Transport.TCP,
  options: {
    host: '127.0.0.1',
    port: 8888,
  },
};
