import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';
import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
// quando vamos testar algo que não altera  a aplicação em si,
// Devemos criar uma estrutura minima e básica.
// Criar um provider global.
// sempre que for fazer integração com serviço externo utilizar um provider global.
// Não criar integração muito atrelada ao código.
// Sempre criar um novo provider.
// O Teste precisa passar da forma mais simples possivel
//  Para depois criar mais testes, e ir refatorando o código.
// Testar o código da maneira mais simples possível.

let fakeUserRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUsersTokenRepository: FakeUserTokensRepository;
let sendForgotPasswordMail: SendForgotPasswordEmailService;

describe('SenfForgotPasswordEmail', () => {
  beforeEach(() => {
    // antes de cada it, ele vai instanciar as paradinhas ai em abaixo
    // before all e before each  dispara funções de forma automatica;
    fakeUserRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUsersTokenRepository = new FakeUserTokensRepository();

    sendForgotPasswordMail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeUsersTokenRepository,
    );
  });
  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'Jhon dow',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordMail.execute({
      email: 'jhondoe@example.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existing user password', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      sendForgotPasswordMail.execute({
        email: 'jhondoe@example.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordMail.execute({
      email: 'jhondoe@example.com',
    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});

// Primeiro fazer o test falhar RED,
// Green  Fazer com que ele passe
// Refatorar o codigo

// Resetar a senha
//!identificar o usuário

/* ? Existem duas formas de  criar os testes, utilizando a função it() ou a função teste() */
