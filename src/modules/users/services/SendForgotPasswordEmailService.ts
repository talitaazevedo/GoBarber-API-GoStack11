import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
interface IRequest {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}
  public async execute({ email }: IRequest): Promise<void> {
    // Bora tentar utilizar  o serviço

    this.mailProvider.sendMail(
      email,
      'Pedido de Recuperação de Senha recebido',
    );
  }
}

export default SendForgotPasswordEmailService;
