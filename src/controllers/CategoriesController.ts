import { Response, RequestHandler } from 'express';

import { ICategoriesRepository } from '../repositories/categories';
import {
  CreateCategoryService,
  UpdateCategoryService,
  DeleteCategoryService,
  ShowCategoryService,
  ListCategoryService,
} from '../services/categories';

class CategoriesRepository {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  store: RequestHandler = async (request, response): Promise<Response> => {
    const { name } = request.body;

    const createCategoryService = new CreateCategoryService(
      this.categoriesRepo
    );

    const categoryData = await createCategoryService.execute({
      name,
    });

    return response.status(200).json(categoryData);
  };

  update: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;
    const { name } = request.body;

    const updateCategoryService = new UpdateCategoryService(
      this.categoriesRepo
    );

    const categoryData = await updateCategoryService.execute({
      id,
      name,
    });

    return response.status(200).json(categoryData);
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

    const categoryData = await showCategoryService.execute(id);

    return response.status(200).json(categoryData);
  };

  index: RequestHandler = async (_, response): Promise<Response> => {
    const listCategoryService = new ListCategoryService(this.categoriesRepo);

    const categoriesData = await listCategoryService.execute();

    return response.status(200).json(categoriesData);
  };
}

export default CategoriesRepository;
