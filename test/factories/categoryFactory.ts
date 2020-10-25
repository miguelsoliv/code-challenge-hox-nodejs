import faker from 'faker';

import Category from '../../src/models/Category';
import { ICategoriesRepository } from '../../src/repositories/categories';

const createRandomCategory = async (
  categoriesRepo: ICategoriesRepository
): Promise<Category> => {
  const fakeCategory = await categoriesRepo.create({
    name: faker.name.findName(),
  });

  return fakeCategory;
};

export default createRandomCategory;
