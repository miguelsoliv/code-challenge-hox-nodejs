import { Router } from 'express';
import Joi from 'joi';

import { productsController } from '../controllers';
import { customValidationJoiData } from '../helpers';
import validateRouteData from '../middlewares/validateRouteData';

const productsRoutes = Router();

productsRoutes.post(
  '/',
  validateRouteData({
    body: Joi.object({
      name: Joi.string().required(),
      category_id: Joi.string().uuid().required(),
      expiration_date: Joi.custom(
        customValidationJoiData.validateDate
      ).required(),
      manufacturing_date: Joi.custom(
        customValidationJoiData.validateDate
      ).required(),
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
      expiration_date: Joi.custom(
        customValidationJoiData.validateDate
      ).required(),
      manufacturing_date: Joi.custom(
        customValidationJoiData.validateDate
      ).required(),
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

productsRoutes.get(
  '/:page/:category/:orderBy?',
  validateRouteData({
    params: Joi.object({
      page: Joi.custom(customValidationJoiData.validateParamsNumber).required(),
      category: Joi.string().allow('all').required(),
      orderBy: Joi.string().valid(
        'name',
        'manufacturing_date',
        'perishable_product',
        'expiration_date',
        'price'
      ),
    }),
  }),
  productsController.index
);

export default productsRoutes;
