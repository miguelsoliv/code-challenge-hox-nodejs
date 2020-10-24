import { Response, RequestHandler } from 'express';

import { ICategoriesRepository } from '../repositories/categories';
import {
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
  ShowCategoryService,
  ListCategoryService,
} from '../services/categories';
import categoriesView from '../views/categories_view';

class CategoriesRepository {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  store: RequestHandler = async (request, response): Promise<Response> => {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService(
      this.categoriesRepo
    );

    const { category } = await createCategoryService.execute({
      name,
    });

    return response.status(200).json({
      category: categoriesView.render(category),
    });
  };

  update: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;
    const { name } = request.body;

    const updateCategoryService = new UpdateCategoryService(
      this.categoriesRepo
    );

    const { category } = await updateCategoryService.execute({
      id,
      name,
    });

    return response.status(200).json({
      category: categoriesView.render(category),
    });
  };

  remove: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;

    const deleteCategoryService = new DeleteCategoryService(
      this.categoriesRepo
    );

    await deleteCategoryService.execute(id);

    return response.status(204).send();
  };

  show: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;

    const showCategoryService = new ShowCategoryService(this.categoriesRepo);

    const { category } = await showCategoryService.execute(id);

    return response.status(200).json({
      category: categoriesView.render(category),
    });
  };

  index: RequestHandler = async (_, response): Promise<Response> => {
    const listCategoryService = new ListCategoryService(this.categoriesRepo);

    const { categories } = await listCategoryService.execute();

    return response.status(200).json({
      categories: categoriesView.renderMany(categories),
    });
  };
}

export default CategoriesRepository;
