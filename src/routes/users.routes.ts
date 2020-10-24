import { Router } from 'express';
import Joi from 'joi';

import { usersController } from '../controllers';
import validateRouteData from '../middlewares/validateRouteData';

const usersRoutes = Router();

usersRoutes.post(
  '/',
  validateRouteData({
    body: Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    }),
  }),
  usersController.store
);

export default usersRoutes;
