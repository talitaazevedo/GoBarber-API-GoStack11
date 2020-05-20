// Para Lidar com a parte de agendamento Vamos Começar a listar todos  os prestadores.import { injectable, inject } from 'tsyringe';

import 'reflect-metadata';
import { injectable, inject } from 'tsyringe';
import { getDaysInMonth, getDate, getHours } from 'date-fns';

import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}
// [{ day: 1 available: false}]
// Maneira mais fácil de entender o que é um array
type IResponse = Array<{
  hour: number;
  available: boolean;
}>;

@injectable()
class ListProviderDayAvailabilittyService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      {
        provider_id,
        month,
        year,
        day,
      },
    );

    const hourStart = 8;
    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hourStart,
    );

    const availability = eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour,
      );
      return {
        hour,
        available: !hasAppointmentInHour,
      };
    });
    console.log('Hour', availability);

    return availability;
  }
}

export default ListProviderDayAvailabilittyService;
