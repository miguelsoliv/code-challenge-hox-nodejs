import Category from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/categories';

interface IResponse {
  categories: Category[];
}

class ListCategoryService {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  execute = async (): Promise<IResponse> => {
    const categories = await this.categoriesRepo.findAll();

    return { categories };
  };
}

export default ListCategoryService;
