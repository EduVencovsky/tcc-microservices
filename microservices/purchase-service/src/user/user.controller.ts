import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Controller,
  Logger,
} from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EventPattern } from '@nestjs/microservices';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  private readonly logger = new Logger(UserController.name);

  @EventPattern('ping')
  ping() {
    this.logger.log('pong');
    return 'pong';
  }

  @EventPattern('user_created')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @EventPattern('user_updated')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('user_deleted')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
