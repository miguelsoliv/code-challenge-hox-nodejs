import faker from 'faker';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { ICreateCategoryDTO, IUpdateCategoryDTO } from '../../dtos/categoryDTO';
import Category from '../../models/Category';
import ICategoriesRepository from './ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  private categories: Category[] = [];

  async create(data: ICreateCategoryDTO): Promise<Category> {
    const category = {
      ...data,
      id: faker.random.uuid(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    this.categories.push(category);

    return category;
  }

  async updateOrFail(data: IUpdateCategoryDTO): Promise<Category> {
    const findCategory = await this.findByIdOrFail(data.id);

    const categoryIndex = this.categories.findIndex(
      category => category.id === findCategory.id
    );

    this.categories[categoryIndex] = findCategory;

    return this.categories[categoryIndex];
  }

  async deleteOrFail(id: string): Promise<void> {
    const findCategory = await this.findByIdOrFail(id);

    const categoryIndex = this.categories.findIndex(
      category => category.id === findCategory.id
    );

    this.categories.splice(categoryIndex);
  }

  async findByIdOrFail(id: string): Promise<Category> {
    const findCategory = this.categories.find(category => category.id === id);

    if (!findCategory) throw new EntityNotFoundError(Category, '');

    return findCategory;
  }

  async findAll(): Promise<Category[]> {
    return this.categories;
  }
}

export default FakeCategoriesRepository;
