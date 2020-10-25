import { getRepository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { ICreateCategoryDTO, IUpdateCategoryDTO } from '../../dtos/categoryDTO';
import Category from '../../models/Category';
import ICategoriesRepository from './ICategoriesRepository';

class TypeormCategoriesRepository implements ICategoriesRepository {
  async create(data: ICreateCategoryDTO): Promise<Category> {
    const categoriesRepo = getRepository(Category);

    const category = categoriesRepo.create(data);

    return categoriesRepo.save(category);
  }

  async updateOrFail(data: IUpdateCategoryDTO): Promise<Category> {
    const updateResult = await getRepository(Category)
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', {
        id: data.id,
      })
      .returning('*')
      .execute();

    if (!updateResult.raw[0]) throw new EntityNotFoundError(Category, '');

    return updateResult.raw[0];
  }

  async deleteOrFail(id: string): Promise<void> {
    const deleteResult = await getRepository(Category)
      .createQueryBuilder()
      .delete()
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    if (!deleteResult.raw[0]) throw new EntityNotFoundError(Category, '');
  }

  async findByIdOrFail(id: string): Promise<Category> {
    return getRepository(Category).findOneOrFail(id);
  }

  async findAll(): Promise<Category[]> {
    return getRepository(Category).find();
  }
}

export default TypeormCategoriesRepository;
