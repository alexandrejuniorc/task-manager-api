import { Body, Controller, Get, Post } from '@nestjs/common';

import { UsersService } from './users.service';
import { UserDto } from './user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() user: UserDto) {
    this.usersService.create(user);
  }

  @Get()
  findByUsername(username: string): UserDto {
    return this.usersService.findByUsername(username);
  }
}
