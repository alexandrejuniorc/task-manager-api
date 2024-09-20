import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { hashSync } from 'bcrypt';
import { v4 as uuid } from 'uuid';

@Injectable()
export class UsersService {
  private readonly users: UserDto[] = [];

  create(user: UserDto) {
    user.id = uuid();
    user.password = hashSync(user.password, 10);
    this.users.push(user);
  }

  findByUsername(username: string): UserDto | null {
    return this.users.find((user) => user.username === username);
  }
}
