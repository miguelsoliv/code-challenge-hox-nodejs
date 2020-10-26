import faker from 'faker';

import Category from '../../src/models/Category';
import { ICategoriesRepository } from '../../src/repositories/categories';
import { IProductsRepository } from '../../src/repositories/products';
import createRandomCategory from './categoryFactory';

interface IResponse {
  id: string;
  name: string;
  category_id: string;
  category: Category;
  manufacturing_date: Date;
  perishable_product: boolean;
  expiration_date: Date;
  price: number;
  created_at: Date;
  updated_at: Date;
}

const createRandomProduct = async (
  productsRepo: IProductsRepository,
  categoriesRepo: ICategoriesRepository
): Promise<IResponse> => {
  const category = await createRandomCategory(categoriesRepo);

  const fakeProduct = await productsRepo.create({
    category_id: category.id,
    name: faker.name.findName(),
    price: Number(faker.random.float().toPrecision(2)),
    expiration_date: faker.date.future(),
    manufacturing_date: faker.date.past(),
    perishable_product: faker.random.boolean(),
    category,
  });

  return {
    ...fakeProduct,
    category: { ...category },
  };
};

export default createRandomProduct;
