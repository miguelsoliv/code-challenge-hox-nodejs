import faker from 'faker';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { UpdateCategoryService } from '../../src/services/categories';
import { createRandomCategory } from '../factories';

let fakeCategoriesRepository: FakeCategoriesRepository;
let updateCategoryService: UpdateCategoryService;

beforeAll(async () => {
  fakeCategoriesRepository = new FakeCategoriesRepository();
  updateCategoryService = new UpdateCategoryService(fakeCategoriesRepository);
});

describe('ENDPOINT /categories', () => {
  it('Should be able to update a category', async () => {
    const updateCategorySpy = jest.spyOn(
      fakeCategoriesRepository,
      'updateOrFail'
    );

    const createdCategory = await createRandomCategory(
      fakeCategoriesRepository
    );

    const updatedCategoryResponse = await updateCategoryService.execute({
      id: createdCategory.id,
      name: faker.name.findName(),
    });

    const { id, created_at } = createdCategory;

    expect(updateCategorySpy).toHaveBeenCalledTimes(1);
    expect(updatedCategoryResponse).toEqual<typeof updatedCategoryResponse>({
      category: {
        id,
        name: updatedCategoryResponse.category.name,
        created_at,
        updated_at: updatedCategoryResponse.category.updated_at,
      },
    });
  });

  it('Should not be able to update a non-existing category', async () => {
    const updateCategorySpy = jest.spyOn(
      fakeCategoriesRepository,
      'updateOrFail'
    );

    expect.assertions(3);

    await updateCategoryService
      .execute({
        id: 'invalid-category-id',
        name: faker.name.findName(),
      })
      .catch(err => {
        expect(err).toBeInstanceOf(EntityNotFoundError);
        expect(err).toMatchObject({
          name: 'EntityNotFound',
          message: `Could not find any entity of type "Category" matching: ""`,
        });
        expect(updateCategorySpy).toHaveBeenCalledTimes(1);
      });
  });
});
