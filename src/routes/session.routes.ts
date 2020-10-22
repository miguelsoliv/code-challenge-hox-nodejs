import { Router } from 'express';
import * as Yup from 'yup';

import SessionController from '../controllers/SessionController';
import validateRouteData from '../middlewares/validateRouteData';

const sessionRoutes = Router();

sessionRoutes.post(
  '/',
  validateRouteData({
    body: Yup.object().shape({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    }),
  }),
  SessionController.login
);

export default sessionRoutes;
