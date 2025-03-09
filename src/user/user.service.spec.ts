import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User, Gender } from './entities/user.entity';
import { ConflictException } from '@nestjs/common';
import { createUserReqBody, expectedCreateUserRes } from './user.mock-data';

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockResolvedValue('hashedPassword'),
  compare: jest.fn().mockResolvedValue(true),
}));

const mockUserRepository = {
  findOne: jest.fn(),
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  remove: jest.fn(),
};

describe('UserService', () => {
  let service!: UserService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  beforeEach(async () => {
    jest.clearAllMocks();
  });

  afterAll(async () => {});

  it('undertest service should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('UserService createUser', () => {
    it('should successfully create a new user', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      mockUserRepository.create.mockReturnValueOnce(expectedCreateUserRes);
      mockUserRepository.save.mockResolvedValueOnce(expectedCreateUserRes);

      const result = await service.createUser(createUserReqBody);
      expect(result).toEqual(expectedCreateUserRes);
    });

    it('should throw error if user with specified email already exists', async () => {
      const createDto = {
        email: 'existingEmail@gmail.com',
        password: '123456',
        name: 'Test User',
        dateOfBirth: new Date('1990-01-01'),
        gender: Gender.MALE,
        address: '123 Test St',
        isSubscribedToNewsletter: true,
      };

      mockUserRepository.findOne.mockResolvedValueOnce({
        id: 12,
        email: 'existingEmail@gmail.com',
      });

      await expect(service.createUser(createDto)).rejects.toThrow(
        ConflictException,
      );
    });
  });
});
