// Para Lidar com a parte de agendamento Vamos Começar a listar todos  os prestadores.import { injectable, inject } from 'tsyringe';

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';

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
    // Fiz uma unica query do Banco
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider(
      {
        provider_id,
        year,
        month,
      },
    );
    // os meses no javascript nativo começam com 0 janeiro e vai até 11 dezembro por isso estou tirando um número da variável month

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
    // Array.from => cria um array a partir de alguma coisa.
    // Formar um array com os dias d mes
    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      // isso aqui faz o index do array começar em 1
      (_, index) => index + 1,
    );

    // Aqui eu faço apenas um filtro para buscar  as
    //  informações da query
    const availability = eachDayArray.map(day => {
      // faz um filtro e essa função do datefns getDAte retorna um dia
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      // Retorna um objeto, available retorna true ou false,
      // se for menor que 10 quer dizer que eu tenho  ao menos um horário livre no dia, ai ele retorna true.
      return { day, available: appointmentsInDay.length < 10 };
    });

    console.log('Availability', availability);

    return availability;
  }
}

export default ListProviderMonthAvailabilittyService;
