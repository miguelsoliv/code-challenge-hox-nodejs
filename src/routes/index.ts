import { Router } from 'express';

import ensureUserAuthenticated from '../middlewares/ensureUserAuthenticated';
import categoriesRoutes from './categories.routes';
import sessionRoutes from './session.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/users', usersRoutes);

routes.use(ensureUserAuthenticated);
routes.use('/categories', categoriesRoutes);

export default routes;
