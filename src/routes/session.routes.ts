import { Router } from 'express';
import Joi from 'joi';

import { sessionController } from '../controllers';
import validateRouteData from '../middlewares/validateRouteData';

const sessionRoutes = Router();

sessionRoutes.post(
  '/',
  validateRouteData({
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  sessionController.login
);

export default sessionRoutes;
