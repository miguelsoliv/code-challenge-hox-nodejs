import { Router } from 'express';

import sessionRoutes from './session.routes';
import usersRoutes from './users.routes';

const routes = Router();

routes.use('/session', sessionRoutes);
routes.use('/users', usersRoutes);

export default routes;
