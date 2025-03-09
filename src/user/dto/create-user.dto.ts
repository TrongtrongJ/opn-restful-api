import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsDate,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123', minLength: 8 })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '1990-01-01' })
  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  dateOfBirth: Date;

  @ApiProperty({ enum: Gender, example: Gender.MALE })
  @IsEnum(Gender)
  @IsNotEmpty()
  gender: Gender;

  @ApiProperty({ example: '123 Main St, City, Country' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: true })
  @IsBoolean()
  @IsOptional()
  isSubscribedToNewsletter?: boolean = false;
}
