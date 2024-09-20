import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthResponseDto } from './auth.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = Number(
      this.configService.get<number>('JWT_EXPIRATION_TIME'),
    );
  }

  signIn(username: string, password: string): AuthResponseDto {
    const foundUser = this.usersService.findByUsername(username);

    if (!foundUser || !compareSync(password, foundUser.password)) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);

    return { token, expiresIn: this.jwtExpirationTimeInSeconds };
  }
}
