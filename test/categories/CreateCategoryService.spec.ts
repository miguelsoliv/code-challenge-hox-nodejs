import faker from 'faker';

import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { CreateCategoryService } from '../../src/services/categories';

let fakeCategoriesRepository: FakeCategoriesRepository;
let createCategoryService: CreateCategoryService;

beforeAll(async () => {
  fakeCategoriesRepository = new FakeCategoriesRepository();
  createCategoryService = new CreateCategoryService(fakeCategoriesRepository);
});

describe('ENDPOINT /categories', () => {
  it('Should be able to create a category', async () => {
    const createCategorySpy = jest.spyOn(fakeCategoriesRepository, 'create');

    const categoryData = {
      name: faker.name.findName(),
    };

    const createdCategoryResponse = await createCategoryService.execute(
      categoryData
    );

    const { name } = categoryData;

    expect(createCategorySpy).toHaveBeenCalledTimes(1);
    expect(createdCategoryResponse).toEqual<typeof createdCategoryResponse>({
      category: {
        id: createdCategoryResponse.category.id,
        name,
        created_at: createdCategoryResponse.category.created_at,
        updated_at: createdCategoryResponse.category.updated_at,
      },
    });
  });
});
