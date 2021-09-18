import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @MessagePattern({ cmd: 'ping' })
  ping() {
    return this.userService.ping();
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll(): Promise<User[]> {
    this.logger.log(`findAll`);

    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'create' })
  create(@Payload() createUserDto: CreateUserDto): Promise<User> {
    this.logger.log(`create: ${JSON.stringify(createUserDto)}`);

    return this.userService.create(createUserDto);
  }

  @MessagePattern({ cmd: 'findOne' })
  async findOne(@Payload() { id }: { id: number }): Promise<User> {
    this.logger.log(`findOne: id=${id}`);

    const user = await this.userService.findOne(id);
    return user ? user : null;
  }

  @MessagePattern({ cmd: 'update' })
  update(
    @Payload('id') id: string,
    @Payload() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    this.logger.log(`update: ${JSON.stringify(updateUserDto)}`);

    return this.userService.update(+id, updateUserDto);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload('id') id: string) {
    this.logger.log(`delete: id=${id}`);

    return this.userService.delete(+id);
  }
}
