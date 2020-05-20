import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ListProviderMonthAvailabilittyService from '@modules/appointments/services/ListProviderMonthAvailabilittyService';

export default class ProviderMonthAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year } = request.body;
    // Importamos o container do tsyringe e passamos resolve() instanciar  o repositorio.
    const listProviders = container.resolve(
      ListProviderMonthAvailabilittyService,
    );

    const availability = await listProviders.execute({
      provider_id,
      month,
      year,
    });

    return response.json(availability);
  }
}
