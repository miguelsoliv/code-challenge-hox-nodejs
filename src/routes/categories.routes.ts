import { Router } from 'express';
import * as Yup from 'yup';

import CategoriesController from '../controllers/CategoriesController';
import validateRouteData from '../middlewares/validateRouteData';

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  validateRouteData({
    body: Yup.object().shape({
      name: Yup.string().required(),
    }),
  }),
  CategoriesController.store
);

categoriesRoutes.put(
  '/:id',
  validateRouteData({
    body: Yup.object().shape({
      name: Yup.string().required(),
    }),
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  CategoriesController.update
);

categoriesRoutes.delete(
  '/:id',
  validateRouteData({
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  CategoriesController.remove
);

categoriesRoutes.get(
  '/:id',
  validateRouteData({
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  CategoriesController.show
);

categoriesRoutes.get('/', validateRouteData({}), CategoriesController.index);

export default categoriesRoutes;
