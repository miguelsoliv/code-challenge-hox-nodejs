import { Router } from 'express';
import * as Yup from 'yup';

import UsersController from '../controllers/UsersController';
import validateRouteData from '../middlewares/validateRouteData';

const usersRoutes = Router();

usersRoutes.post(
  '/',
  validateRouteData({
    body: Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
  }),
  UsersController.store
);

export default usersRoutes;
