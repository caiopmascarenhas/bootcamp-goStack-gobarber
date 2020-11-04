import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AppError from '@shared/errors/AppError';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    );
  })

  it('should be able update the profile', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
    });

    expect(updatedUser.name).toBe('John Trê');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able update the profile from non-existing user', async () => {
    expect(updateProfile.execute({
      user_id: 'non-existing-user-id',
      name: 'John Doe',
      email: "johndoe@example.com",
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to change to another user email', async () => {

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123'
    })

    const user = await fakeUsersRepository.create({
      name: 'teste',
      email: "teste@example.com",
      password: '123'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johndoe@example.com",
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123456'
    })

    const updatedUser = await updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
      old_password: "123456",
      password: "123",
    });

    expect(updatedUser.password).toBe('123');
    expect(updatedUser.email).toBe('johntre@example.com');
  });

  it('should not be able update the password without old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
      password: "123",
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with wrong old password', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123456'
    })

    await expect(updateProfile.execute({
      user_id: user.id,
      name: "John Trê",
      email: "johntre@example.com",
      old_password: 'wrong-old-password',
      password: "123",
    })).rejects.toBeInstanceOf(AppError);
  });

});