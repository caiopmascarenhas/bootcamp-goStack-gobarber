import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let fakeCacheProvider: FakeCacheProvider;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {

  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeCacheProvider = new FakeCacheProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    );

  })

  it('should be able to authneticate', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123'
    })

    const response = await authenticateUser.execute({
      email: "johndoe@example.com",
      password: '123'
    });

    expect(response).toHaveProperty('token');

    expect(response.user).toEqual(user);
  });

  it('should not be able to authneticate with non existing user', async () => {

    await expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: '123'
    })).rejects.toBeInstanceOf(AppError);

  });

  it('should not be able to authneticate with wrong password', async () => {

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123'
    })

    await expect(authenticateUser.execute({
      email: "johndoe@example.com",
      password: 'wrong-password'
    })).rejects.toBeInstanceOf(AppError);

  });


});