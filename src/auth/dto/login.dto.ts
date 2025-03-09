import { CreateUserDto } from '../../user/dto/create-user.dto';

export class RegisterDto extends CreateUserDto {}

// src/auth/dto/login.dto.ts
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}
