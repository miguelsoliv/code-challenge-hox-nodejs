import Category from '../../models/Category';
import { ICategoriesRepository } from '../../repositories/categories';

interface IRequest {
  name: string;
}

interface IResponse {
  category: Category;
}

class CreateCategoryService {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  execute = async ({ name }: IRequest): Promise<IResponse> => {
    const category = await this.categoriesRepo.create({
      name,
    });

    return { category };
  };
}

export default CreateCategoryService;
