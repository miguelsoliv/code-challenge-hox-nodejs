import { TypeormCategoriesRepository } from '../repositories/categories';
import { TypeormUsersRepository } from '../repositories/users';
import CategoriesController from './CategoriesController';
import SessionController from './SessionController';
import UsersController from './UsersController';

const categoriesController = new CategoriesController(
  new TypeormCategoriesRepository()
);

const sessionController = new SessionController(new TypeormUsersRepository());

const usersController = new UsersController(new TypeormUsersRepository());

export { categoriesController, sessionController, usersController };
