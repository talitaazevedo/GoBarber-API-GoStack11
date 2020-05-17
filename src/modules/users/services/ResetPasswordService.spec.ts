import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUserRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;
let fakeHashProvider: FakeHashProvider;
describe('ResetPasswordService', () => {
  beforeEach(() => {
    // antes de cada it, ele vai instanciar as paradinhas ai em abaixo
    // before all e before each  dispara funções de forma automatica;
    fakeUserRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository,
      fakeHashProvider,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon dow',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    const { token } = await fakeUsersTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    // updatedUser? significa que o campo pode ser nulo então se fazer primeiro uma verificação
    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });
  // Hash
  // 2h de Expiração
  // User TOken inexistente
  // user inexistente
  it('should not be able to reset passwor with non-existing token', async () => {
    await expect(
      resetPasswordService.execute({
        token: 'non-existing-token',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset passwor with non-existing user', async () => {
    const { token } = await fakeUsersTokenRepository.generate(
      'no-existing-user',
    );
    await expect(
      resetPasswordService.execute({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon dow',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUsersTokenRepository.generate(user.id);

    // mock
    // Date.now() retorna data em timestamp
    // Mock implementation vou passar uma função  ao invez de executar  a função do javascript
    // Mock implementation once => Once  significa uma vez
    // Conceito de mock implementa uma função customizada
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      const customDate = new Date();
      // retorna 3 horas a mais
      return customDate.setHours(customDate.getHours() + 3);
    });
    await expect(
      resetPasswordService.execute({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
