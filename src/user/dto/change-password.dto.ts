import { IsNotEmpty, IsString, MinLength, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  newPassword: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  @IsNotEmpty()
  confirmPassword: string;
}
