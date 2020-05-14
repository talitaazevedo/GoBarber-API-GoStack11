import { EntityRepository, Repository } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
/*@EntityRepository(Appointment) recebe como parametro o Model  */
/* A Classe depende dop Repository qyue vem de type ORM Repository<Appointment>  */

// SOLID
// Liskov Substituition Principle
// Principio da prograsmação que diz que  deve ser possível substituir as informações
// Criando um conjunto de regras.
// Service não deve conhecer se o que usa  no backend é o  typeorm sql etc.

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>
  implements IAppointmentsRepository {
  /* O retorno de uma função asyncrona sempre é uma promise */
  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.findOne({
      where: { date },
    });

    return findAppointment || undefined;
  }
}

export default AppointmentsRepository;
