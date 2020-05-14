import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
// I na frente do arquivo significa que é uma interface
// ? Informar quais metodos os appointment precisa ter

export default interface IAppointmentsRepository {
  findByDate(date: Date): Promise<Appointment | undefined>;
}
