import { Exclude, Expose, Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '../entities/user.entity';

export class UserDataResponseDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  @Transform(({ obj }) => obj.getUserAge())
  age: number;

  @ApiProperty({ enum: Gender })
  gender: Gender;

  @ApiProperty()
  address: string;

  @ApiProperty()
  isSubscribedToNewsletter: boolean;

  @Exclude()
  password: string;

  @Exclude()
  dateOfBirth: Date;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  constructor(partial: Partial<UserDataResponseDto>) {
    Object.assign(this, partial);
  }
}
