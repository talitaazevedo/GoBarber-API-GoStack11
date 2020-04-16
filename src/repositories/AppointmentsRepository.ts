
import {EntityRepository, Repository} from 'typeorm'
import Appointment from '../models/Appointment';
/*@EntityRepository(Appointment) recebe como parametro o Model  */
/* A Classe depende dop Repository qyue vem de type ORM Repository<Appointment>  */
@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment>{


  /* O retorno de uma função asyncrona sempre é uma promise */
  public async findByDate(date:Date): Promise<Appointment | null> {

    const findAppointment = await this.findOne({
      where:{ date },
    })



  return findAppointment || null ;


  }

}

export default AppointmentsRepository;
