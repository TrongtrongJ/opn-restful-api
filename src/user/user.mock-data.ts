import { Gender } from './entities/user.entity';

export const createUserReqBody = {
  email: 'test@example.com',
  password: '123456',
  name: 'Test User',
  dateOfBirth: new Date('1992-01-01'),
  gender: Gender.MALE,
  address: '455 Chaingmai',
  isSubscribedToNewsletter: true,
};

export const expectedCreateUserRes = {
  id: 14,
  email: 'devtest@gmail.com',
  password: 'hashedPassword',
  name: 'Test User',
  dateOfBirth: new Date('1992-01-01'),
  gender: Gender.MALE,
  address: '455 Chaingmai',
  isSubscribedToNewsletter: true,
  getUserAge: jest.fn().mockReturnValue(33),
};
