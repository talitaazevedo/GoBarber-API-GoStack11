// Para Lidar com a parte de agendamento Vamos Começar a listar todos  os prestadores.import { injectable, inject } from 'tsyringe';

import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    const users = await this.usersRepository.findAllProviders({
      expect_user_id: user_id,
    });
    if (!users) {
      throw new AppError('User not found');
    }

    return users;
  }
}

export default ListProvidersService;
