import { Router } from 'express';

// DTO => Data Transfer Object => using objects

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProvidersController from '../controllers/ProvidersController';
import ProviderDayAvailabilityController from '../controllers/ProviderDayAvailabilityController copy';
import ProviderMonthAvailabilityController from '../controllers/ProviderMonthAvailabilityController';

const providersRouter = Router();
providersRouter.use(ensureAuthenticated);

const providersController = new ProvidersController();
const providerDayAvailabilityController = new ProviderDayAvailabilityController();
const providerMonthAvailabilityController = new ProviderMonthAvailabilityController();

providersRouter.get('/', providersController.index);
providersRouter.get(
  '/:provider_id/day-availability',
  providerDayAvailabilityController.index,
);
providersRouter.get(
  '/:provider_id/month-availability',
  providerMonthAvailabilityController.index,
);

export default providersRouter;
