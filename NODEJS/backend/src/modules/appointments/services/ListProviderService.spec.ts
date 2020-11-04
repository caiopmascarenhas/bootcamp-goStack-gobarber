
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheProvider from '@shared/container/providers/CacheProvider/fakes/FakeCacheProvider';
import AppError from '@shared/errors/AppError';
import ListProviderService from './ListProviderService';

let fakeUsersRepository: FakeUsersRepository;
let fakeCacheProvider: FakeCacheProvider;
let listProvider: ListProviderService;

describe('ListProvider', () => {

  beforeEach(() => {

    fakeUsersRepository = new FakeUsersRepository();
    fakeCacheProvider = new FakeCacheProvider();
    listProvider = new ListProviderService(
      fakeUsersRepository,
      fakeCacheProvider
    );
  })

  it('should be able to list the providers', async () => {

    const userOne = await fakeUsersRepository.create({
      name: 'John Doe',
      email: "johndoe@example.com",
      password: '123'
    })

    const userTwo = await fakeUsersRepository.create({
      name: 'John Trê',
      email: "johntre@example.com",
      password: '123'
    })

    const loggerdUser = await fakeUsersRepository.create({
      name: 'John Qua',
      email: "johnqua@example.com",
      password: '123'
    })

    const providers = await listProvider.execute({
      user_id: loggerdUser.id,
    });

    expect(providers).toEqual([userOne, userTwo]);

  });

});