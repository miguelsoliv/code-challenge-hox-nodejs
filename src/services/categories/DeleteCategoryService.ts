import { ICategoriesRepository } from '../../repositories/categories';

class DeleteCategoryService {
  constructor(private categoriesRepo: ICategoriesRepository) {}

  execute = async (id: string): Promise<void> => {
    await this.categoriesRepo.delete(id);
  };
}

export default DeleteCategoryService;
