import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUserRepository: FakeUsersRepository;

let showProfile: ShowProfileService;

describe('ShowProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();

    showProfile = new ShowProfileService(fakeUserRepository);
  });
  it('should be able to show  the Profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon dow',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Jhon dow');
    expect(profile.email).toBe('jhondoe@example.com');
  });
  it('should not be able to show  the Profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: 'non-existent-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
