import { Router } from 'express';
import Joi from 'joi';

import { productsController } from '../controllers';
import { validateJoiDate } from '../helpers';
import validateRouteData from '../middlewares/validateRouteData';

const productsRoutes = Router();

productsRoutes.post(
  '/',
  validateRouteData({
    body: Joi.object({
      name: Joi.string().required(),
      category_id: Joi.string().uuid().required(),
      expiration_date: Joi.custom(validateJoiDate).required(),
      manufacturing_date: Joi.custom(validateJoiDate).required(),
      perishable_product: Joi.boolean().required(),
      price: Joi.number().precision(2).positive().required(),
    }),
  }),
  productsController.store
);

productsRoutes.put(
  '/:id',
  validateRouteData({
    body: Joi.object({
      name: Joi.string().required(),
      category_id: Joi.string().uuid().required(),
      expiration_date: Joi.custom(validateJoiDate).required(),
      manufacturing_date: Joi.custom(validateJoiDate).required(),
      perishable_product: Joi.boolean().required(),
      price: Joi.number().precision(2).positive().required(),
    }),
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.update
);

productsRoutes.delete(
  '/:id',
  validateRouteData({
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.remove
);

productsRoutes.get(
  '/:id',
  validateRouteData({
    params: Joi.object({
      id: Joi.string().uuid().required(),
    }),
  }),
  productsController.show
);

productsRoutes.get('/', validateRouteData({}), productsController.index);

export default productsRoutes;
