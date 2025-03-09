import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    const userExists = await this.userRepository.findOne({ where: { email } });
    if (userExists) {
      throw new ConflictException(
        'The user with specified email already exists',
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUserById(
    id: number,
    updateUserDto: UpdateUserDto,
  ): Promise<User> {
    const user = await this.findUserById(id);

    // Update user properties
    Object.assign(user, updateUserDto);

    return this.userRepository.save(user);
  }

  async deleteUserById(id: number): Promise<void> {
    const user = await this.findUserById(id);
    await this.userRepository.softRemove(user);
  }

  async changePassword(
    id: number,
    changePasswordDto: ChangePasswordDto,
  ): Promise<void> {
    const { currentPassword, newPassword, confirmPassword } = changePasswordDto;

    if (newPassword !== confirmPassword) {
      throw new UnauthorizedException(
        'New password and password confirmation do not match',
      );
    }

    const existingUser = await this.findUserById(id);

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      existingUser.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid password');
    }

    existingUser.password = await bcrypt.hash(newPassword, 10);
    await this.userRepository.save(existingUser);
  }
}
