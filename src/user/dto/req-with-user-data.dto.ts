import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

class UserDataDto {
  @ApiProperty({ example: 14 })
  id: number;
}

export class ReqWithUserDataDto {
  @Type(() => UserDataDto)
  @ApiProperty({ type: UserDataDto })
  user: UserDataDto;
}
