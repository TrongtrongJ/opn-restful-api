import {
  Controller,
  Get,
  Patch,
  Delete,
  Body,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { AuthGuard } from '../auth/guards/auth.guard';
import { UserDataResponseDto } from './dto/user-response.dto';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { ReqWithUserDataDto } from './dto/req-with-user-data.dto';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiOperation({ summary: 'Get user profile' })
  @ApiResponse({
    status: 200,
    description: 'Get user profile successfully',
    type: UserDataResponseDto,
  })
  async getProfile(@Req() req): Promise<UserDataResponseDto> {
    const user = await this.userService.findUserById(req.user.id);
    return plainToClass(UserDataResponseDto, user);
  }

  @Patch('profile')
  @ApiOperation({ summary: 'Patch user profile' })
  @ApiResponse({
    status: 200,
    description: 'Patch user profile successfully',
    type: UserDataResponseDto,
  })
  async updateProfile(
    @Req() req: ReqWithUserDataDto,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDataResponseDto> {
    const updatedUser = await this.userService.updateUserById(
      req.user.id,
      updateUserDto,
    );
    return plainToClass(UserDataResponseDto, updatedUser, {
      excludeExtraneousValues: true,
    });
  }

  @Patch('password')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({
    status: 204,
    description: 'Change user password successfully',
  })
  async changePassword(
    @Req() req: ReqWithUserDataDto,
    @Body() changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    await this.userService.changePassword(req.user.id, changePasswordDto);
  }

  @Delete('profile')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete user profile' })
  @ApiResponse({ status: 204, description: 'Delete user profile successfully' })
  async deleteUser(@Req() req: ReqWithUserDataDto): Promise<void> {
    await this.userService.deleteUserById(req.user.id);
  }
}
