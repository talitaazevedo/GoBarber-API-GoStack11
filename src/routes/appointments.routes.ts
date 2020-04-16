
import { Router} from 'express';
import {getCustomRepository }from 'typeorm';
import {parseISO } from 'date-fns';

// DTO => Data Transfer Object => using objects

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppoinemtnService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);


// Rota: Reaceber a requisição, chamar um outro arquivo, devolver uma resposta
appointmentsRouter.get('/',async  (request,response)=>{

  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await  appointmentsRepository.find();
  return response.json(appointments);


});



appointmentsRouter.post('/',async (request, response)=> {

  try{
    const { provider_id, date } = request.body;

    /* Convert date */
    const parsedDateIso = parseISO(date);


    const createAppointment = new CreateAppoinemtnService();

    const appointment = await createAppointment.execute({provider_id,date:parsedDateIso})


    return response.json(appointment);
  }catch(err){

    return response.status(400).json({error:err.message});

  }
})


export default appointmentsRouter;
