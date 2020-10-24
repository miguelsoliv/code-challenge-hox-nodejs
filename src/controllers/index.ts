import { TypeormCategoriesRepository } from '../repositories/categories';
import { TypeormProductsRepository } from '../repositories/products';
import { TypeormUsersRepository } from '../repositories/users';
import CategoriesController from './CategoriesController';
import ProductsController from './ProductsController';
import SessionController from './SessionController';
import UsersController from './UsersController';

const categoriesController = new CategoriesController(
  new TypeormCategoriesRepository()
);

const sessionController = new SessionController(new TypeormUsersRepository());

const usersController = new UsersController(new TypeormUsersRepository());

const productsController = new ProductsController(
  new TypeormProductsRepository()
);

export {
  categoriesController,
  sessionController,
  usersController,
  productsController,
};
