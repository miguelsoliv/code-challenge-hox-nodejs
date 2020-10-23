import Category from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/categories';

interface IResponse {
  category: Category;
}

class ShowCategoryService {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  execute = async (id: string): Promise<IResponse> => {
    const category = await this.categoriesRepo.findByIdOrFail(id);

    return { category };
  };
}

export default ShowCategoryService;
