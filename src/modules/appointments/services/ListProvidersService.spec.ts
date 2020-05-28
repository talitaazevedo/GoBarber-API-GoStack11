import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;

let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    listProviders = new ListProvidersService(fakeUserRepository);
  });
  it('should be able to list  the Providers', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    const user2 = await fakeUserRepository.create({
      name: 'Jhon tre',
      email: 'jhontre@example.com',
      password: '123456',
    });
    const loggedUser = await fakeUserRepository.create({
      name: 'Jhon Logged',
      email: 'jhonLogged@example.com',
      password: '123456',
    });
    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });

  it('should not be able to list providers without a user', async () => {
    await expect(
      listProviders.execute({ user_id: 'not' }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
