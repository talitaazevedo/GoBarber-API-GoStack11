import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.body;
    // Importamos o container do tsyringe e passamos resolve() instanciar  o repositorio.
    const listProviders = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviders.execute({
      provider_id,
      year,
      month,
      day,
    });

    return response.json(availability);
  }
}
