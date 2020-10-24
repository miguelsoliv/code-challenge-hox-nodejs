import { Router } from 'express';
import * as Yup from 'yup';

import { productsController } from '../controllers';
import validateRouteData from '../middlewares/validateRouteData';

const productsRoutes = Router();

productsRoutes.post(
  '/',
  validateRouteData({
    body: Yup.object().shape({
      name: Yup.string().required(),
      category_id: Yup.string().uuid().required(),
      expiration_date: Yup.string().required(),
      manufacturing_date: Yup.string().required(),
      perishable_product: Yup.boolean().required(),
      price: Yup.number().required(),
    }),
  }),
  productsController.store
);

productsRoutes.put(
  '/:id',
  validateRouteData({
    body: Yup.object().shape({
      name: Yup.string().required(),
      category_id: Yup.string().uuid().required(),
      expiration_date: Yup.date().required(),
      manufacturing_date: Yup.date().required(),
      perishable_product: Yup.boolean().required(),
      price: Yup.number().required(),
    }),
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  productsController.update
);

productsRoutes.delete(
  '/:id',
  validateRouteData({
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  productsController.remove
);

productsRoutes.get(
  '/:id',
  validateRouteData({
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  productsController.show
);

productsRoutes.get('/', validateRouteData({}), productsController.index);

export default productsRoutes;
