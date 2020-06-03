// Para Lidar com a parte de agendamento Vamos Começar a listar todos  os prestadores.import { injectable, inject } from 'tsyringe';

import { injectable, inject } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
  user_id: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ user_id }: IRequest): Promise<User[]> {
    // User[] é o argumento do Recover
    let users = await this.cacheProvider.recover<User[]>(
      `providers-list:${user_id}`,
    );

    if (!users) {
      users = await this.usersRepository.findAllProviders({
        expect_user_id: user_id,
      });
      if (!users || users.length == 0 || users == null) {
        throw new AppError('User not found');
      }

      console.log('A query no banco foi feita!!');

      await this.cacheProvider.save(`providers-list:${user_id}`, users);

      console.log('Salvou no cache');
    }

    return users;
  }
}

export default ListProvidersService;
