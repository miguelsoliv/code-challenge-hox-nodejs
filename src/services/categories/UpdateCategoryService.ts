import Category from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/categories';

interface IRequest {
  id: string;
  name: string;
}

interface IResponse {
  category: Category;
}

class UpdateCategoryService {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  execute = async ({ id, name }: IRequest): Promise<IResponse> => {
    await this.categoriesRepo.findByIdOrFail(id);

    const category = await this.categoriesRepo.update({
      id,
      name,
    });

    return { category };
  };
}

export default UpdateCategoryService;
