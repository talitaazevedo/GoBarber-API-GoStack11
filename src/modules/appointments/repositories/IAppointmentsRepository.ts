import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
// I na frente do arquivo significa que é uma interface
// ? Informar quais metodos os appointment precisa ter
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthFromProviderDTO';

export default interface IAppointmentsRepository {
  // Sempre que precisar importar uma informação composta criar um dtos
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(
    data: IFindAllInMonthFromProviderDTO,
  ): Promise<Appointment[]>;
}
