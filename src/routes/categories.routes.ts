import { Router } from 'express';
import Joi from 'joi';

import { categoriesController } from '../controllers';
import validateRouteData from '../middlewares/validateRouteData';

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  validateRouteData({
    body: Joi.object({
      name: Joi.string().required(),
    }),
  }),
  categoriesController.store
);

categoriesRoutes.put(
  '/:id',
  validateRouteData({
    body: Joi.object({
      name: Joi.string().required(),
    }),
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  categoriesController.update
);

categoriesRoutes.delete(
  '/:id',
  validateRouteData({
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  categoriesController.remove
);

categoriesRoutes.get(
  '/:id',
  validateRouteData({
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  categoriesController.show
);

categoriesRoutes.get('/', validateRouteData({}), categoriesController.index);

export default categoriesRoutes;
