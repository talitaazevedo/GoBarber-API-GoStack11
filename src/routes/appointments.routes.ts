
import { Router} from 'express';
import {parseISO } from 'date-fns';

// DTO => Data Transfer Object => using objects
// import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppoinemtnService from '../services/CreateAppointmentService';

const appointmentsRouter = Router();
const appointmentsRepository = new AppointmentsRepository();


// Rota: Reaceber a requisição, chamar um outro arquivo, devolver uma resposta
appointmentsRouter.get('/', (request,response)=>{

  const appointments = appointmentsRepository.all();
  return response.json(appointments);


});



appointmentsRouter.post('/',(request, response)=> {

  try{
    const { provider, date } = request.body;

    /* Convert date */
    const parsedDateIso = parseISO(date);
    const createAppointment = new CreateAppoinemtnService(appointmentsRepository);

    const appointment = createAppointment.execute({provider,date:parsedDateIso})


    return response.json(appointment);
  }catch(err){

    return response.status(400).json({error:err.message});

  }
})


export default appointmentsRouter;
