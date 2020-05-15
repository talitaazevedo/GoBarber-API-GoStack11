import { Router } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

// DTO => Data Transfer Object => using objects

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

appointmentsRouter.use(ensureAuthenticated);

// Rota: Reaceber a requisição, chamar um outro arquivo, devolver uma resposta
// appointmentsRouter.get('/', async (request, response) => {
//   const appointments = await appointmentsRepository.find();
//   return response.json(appointments);
// });

appointmentsRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  /* Convert date */
  const parsedDateIso = parseISO(date);
  // Importamos o container do tsyringe e passamos resolve() instanciar  o repositorio.
  const createAppointment = container.resolve(CreateAppointmentService);

  const appointment = await createAppointment.execute({
    provider_id,
    date: parsedDateIso,
  });

  return response.json(appointment);

  // return response.status(400).json({error:err.message});
});

export default appointmentsRouter;
