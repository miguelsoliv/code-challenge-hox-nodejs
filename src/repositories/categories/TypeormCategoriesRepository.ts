import { getRepository } from 'typeorm';

import { ICreateCategoryDTO, IUpdateCategoryDTO } from '../../dtos/categoryDTO';
import Category from '../../models/Category';
import ICategoriesRepository from './ICategoriesRepository';

class TypeormCategoriesRepository implements ICategoriesRepository {
  async create(data: ICreateCategoryDTO): Promise<Category> {
    const categoriesRepo = getRepository(Category);

    const category = categoriesRepo.create(data);

    return categoriesRepo.save(category);
  }

  async update(data: IUpdateCategoryDTO): Promise<Category> {
    return getRepository(Category).save(data);
  }

  async delete(id: string): Promise<void> {
    await getRepository(Category).delete(id);
  }

  async findByIdOrFail(id: string): Promise<Category> {
    return getRepository(Category).findOneOrFail(id);
  }

  async findAll(): Promise<Category[]> {
    return getRepository(Category).find();
  }
}

export default TypeormCategoriesRepository;
