import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderDayAvailabilityService from '@modules/appointments/services/ListProviderDayAvailabilityService';

export default class ProviderDayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { month, year, day } = request.query;
    // Requisições do tipo GET => não podem conter corpo da requisição
    // Os query params  recebem as variáveis no formato string, e como estamos trabalhando com numeros será necessário converter.

    // Importamos o container do tsyringe e passamos resolve() instanciar  o repositorio.
    const listProviders = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProviders.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(availability);
  }
}
