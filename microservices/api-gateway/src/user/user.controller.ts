import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Logger,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs/operators';
import { CreateUserDto, UpdateUserDto } from './user.interface';

import { USER_SERVICE } from './user.options';

@Controller('user')
export class UserController {
  constructor(@Inject(USER_SERVICE) private readonly userClient: ClientProxy) {}

  private readonly logger = new Logger(UserController.name);

  @Get('/ping-user')
  pingUserService() {
    const startTs = Date.now();
    const pattern = { cmd: 'ping' };
    const payload = {};
    return this.userClient
      .send<string>(pattern, payload)
      .pipe(
        map((message: string) => ({ message, duration: Date.now() - startTs })),
      );
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`create: ${JSON.stringify(createUserDto)}`);
    const payload = createUserDto;
    const pattern = { cmd: 'create' };

    return this.userClient.send(pattern, payload);
  }

  @Get()
  findAll() {
    this.logger.log(`findAll`);

    const payload = {};
    const pattern = { cmd: 'findAll' };

    return this.userClient.send<string>(pattern, payload);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    this.logger.log(`findOne: id=${id}`);

    const payload = { id };
    const pattern = { cmd: 'findOne' };

    return this.userClient.send(pattern, payload);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.log(
      `update: id=${id}, updateUserDto=${JSON.stringify(updateUserDto)}`,
    );

    const payload = { id, ...updateUserDto };
    const pattern = { cmd: 'update' };

    return this.userClient.send(pattern, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    this.logger.log(`delete: id=${id}`);

    const payload = { id };
    const pattern = { cmd: 'delete' };
    return this.userClient.send(pattern, payload);
  }
}
