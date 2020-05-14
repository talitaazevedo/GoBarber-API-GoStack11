import { getRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
/*@EntityRepository(Appointment) recebe como parametro o Model  */
/* A Classe depende dop Repository qyue vem de type ORM Repository<Appointment>  */

// SOLID
// Liskov Substituition Principle
// Principio da prograsmação que diz que  deve ser possível substituir as informações
// Criando um conjunto de regras.
// Service não deve conhecer se o que usa  no backend é o  typeorm sql etc.

// Conforme a aplicação cresce precisamos  ter um controle maior.

class AppointmentsRepository implements IAppointmentsRepository {
  /* A Tentativa aqui é desconectar o typeORM o maximo possível da aplicação */
  private ormRepository: Repository<Appointment>;
  constructor() {
    this.ormRepository = getRepository(Appointment);
  }
  /* O retorno de uma função asyncrona sempre é uma promise */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }
  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ provider_id, date });
    await this.ormRepository.save(appointment);
    return appointment;
  }
}

export default AppointmentsRepository;
