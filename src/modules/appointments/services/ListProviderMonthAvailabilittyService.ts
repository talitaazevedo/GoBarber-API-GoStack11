// Para Lidar com a parte de agendamento Vamos Começar a listar todos  os prestadores.import { injectable, inject } from 'tsyringe';

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}
// [{ day: 1 available: false}]
// Maneira mais fácil de entender o que é um array
type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilittyService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );
    console.log(appointments);
    return [{ day: 1, available: false }];
  }
}

export default ListProviderMonthAvailabilittyService;
