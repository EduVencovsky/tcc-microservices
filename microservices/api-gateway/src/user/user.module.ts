import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { UserController } from './user.controller';
import { UserOptions } from './user.options';

@Module({
  imports: [ClientsModule.register([UserOptions])],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
