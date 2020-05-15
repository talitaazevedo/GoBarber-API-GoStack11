import { Router } from 'express';
import { parseISO } from 'date-fns';

// DTO => Data Transfer Object => using objects

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import CreateAppoinemtnService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// Rota: Reaceber a requisição, chamar um outro arquivo, devolver uma resposta
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const appointmentsRepository = new AppointmentsRepository();
  const { provider_id, date } = request.body;

  /* Convert date */
  const parsedDateIso = parseISO(date);

  const createAppointment = new CreateAppoinemtnService(appointmentsRepository);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDateIso,
  });

  return response.json(appointment);

  // return response.status(400).json({error:err.message});
});

export default appointmentsRouter;
