import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async registerUser(registerDto: RegisterDto) {
    return this.userService.createUser(registerDto);
  }

  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    try {
      const user = await this.userService.findUserByEmail(email);
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new UnauthorizedException('Invalid email or pasword');
      }

      return {
        accessToken: `faketoken_${user.id}`,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid email or pasword');
    }
  }

  validateToken(token: string) {
    if (!token.startsWith('faketoken_')) {
      return null;
    }

    const userId = token.split('_')[1];
    return { id: userId };
  }
}
