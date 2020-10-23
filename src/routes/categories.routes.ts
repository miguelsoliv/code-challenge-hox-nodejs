import { Router } from 'express';
import * as Yup from 'yup';

import { categoriesController } from '../controllers';
import validateRouteData from '../middlewares/validateRouteData';

const categoriesRoutes = Router();

categoriesRoutes.post(
  '/',
  validateRouteData({
    body: Yup.object().shape({
      name: Yup.string().required(),
    }),
  }),
  categoriesController.store
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
  categoriesController.update
);

categoriesRoutes.delete(
  '/:id',
  validateRouteData({
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  categoriesController.remove
);

categoriesRoutes.get(
  '/:id',
  validateRouteData({
    params: Yup.object().shape({
      id: Yup.string().uuid().required(),
    }),
  }),
  categoriesController.show
);

categoriesRoutes.get('/', validateRouteData({}), categoriesController.index);

export default categoriesRoutes;
