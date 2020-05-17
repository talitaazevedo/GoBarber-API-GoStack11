import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/fakeMailProvider';
// quando vamos testar algo que não altera  a aplicação em si,
// Devemos criar uma estrutura minima e básica.
// Criar um provider global.
// sempre que for fazer integração com serviço externo utilizar um provider global.
// Não criar integração muito atrelada ao código.
// Sempre criar um novo provider.
// O Teste precisa passar da forma mais simples possivel
//  Para depois criar mais testes, e ir refatorando o código.
// Testar o código da maneira mais simples possível.

describe('SenfForgotPasswordEmail', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendForgotPasswordMail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
    );

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
});

// Primeiro fazer o test falhar RED,
// Green  Fazer com que ele passe
// Refatorar o codigo

/* ? Existem duas formas de  criar os testes, utilizando a função it() ou a função teste() */
