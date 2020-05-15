import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
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
  }
}
