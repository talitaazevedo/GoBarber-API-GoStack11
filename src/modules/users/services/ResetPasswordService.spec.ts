import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import ResetPasswordService from './ResetPasswordService';

let fakeUserRepository: FakeUsersRepository;
let fakeUsersTokenRepository: FakeUserTokensRepository;
let resetPasswordService: ResetPasswordService;

describe('SenfForgotPasswordEmail', () => {
  beforeEach(() => {
    // antes de cada it, ele vai instanciar as paradinhas ai em abaixo
    // before all e before each  dispara funções de forma automatica;
    fakeUserRepository = new FakeUsersRepository();
    fakeUsersTokenRepository = new FakeUserTokensRepository();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to reset the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'Jhon dow',
      email: 'jhondoe@example.com',
      password: '123456',
    });
    const { token } = await fakeUsersTokenRepository.generate(user.id);

    await resetPasswordService.execute({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    // updatedUser? significa que o campo pode ser nulo então se fazer primeiro uma verificação

    expect(updatedUser?.password).toBe('123123');
  });
  // Hash
  // 2h de Expiração
  // User TOken inexistente
  // user inexistente
});
