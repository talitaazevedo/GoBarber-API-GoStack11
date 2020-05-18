import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeHashProvider: FakeHashProvider;
let fakeUserRepository: FakeUsersRepository;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });
  it('should be able to update de user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon dow',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon tre',
      email: 'jhontre@example.com',
    });

    expect(updatedUser.name).toBe('Jhon tre');
    expect(updatedUser.email).toBe('jhontre@example.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    const user = await fakeUserRepository.create({
      name: 'Jhon tre',
      email: 'jhontre@example.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon doe',
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should  be able  to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'Jhon Tre',
      email: 'jhontre@example.com',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });
  it('should not be to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Tre',
        email: 'jhontre@example.com',

        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'Jhon Tre',
        email: 'jhontre@example.com',
        old_password: 'wrong-old-password',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
