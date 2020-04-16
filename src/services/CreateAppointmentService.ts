import { startOfHour} from 'date-fns';
import {getCustomRepository} from  'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

/* Tipagem de dados  */
interface Request {
  provider_id: string;
  date: Date;

}

/**
 * Dependency Inversion (SOLID)
 * (SOLID)
 * single Responsability Principle
 *
 */

/* Todo service só tem um metodo */
class CreateAppointmentService {
  public async execute({provider_id,date}:Request): Promise<Appointment>{

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)
    const appointmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if(findAppointmentInSameDate){
      throw Error ('This appointment is already booked');
    }
    /*  O metodo create Cria uma instancia  mas não salva no banco */
    const appointment = appointmentsRepository.create({
      provider_id,
      date:appointmentDate,
    });
    /* após a criação da instancia salvamos no banco */
    await appointmentsRepository.save(appointment);
    return appointment;


  }


}


export default CreateAppointmentService;
