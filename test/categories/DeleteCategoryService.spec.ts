import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { DeleteCategoryService } from '../../src/services/categories';
import { createRandomCategory } from '../factories';

let fakeCategoriesRepository: FakeCategoriesRepository;
let deleteCategoryService: DeleteCategoryService;

beforeAll(async () => {
  fakeCategoriesRepository = new FakeCategoriesRepository();
  deleteCategoryService = new DeleteCategoryService(fakeCategoriesRepository);
});

describe('ENDPOINT /categories', () => {
  it('Should be able to delete a category', async () => {
    const deleteCategorySpy = jest.spyOn(
      fakeCategoriesRepository,
      'deleteOrFail'
    );

    const createdCategory = await createRandomCategory(
      fakeCategoriesRepository
    );

    const categoryBeforeDelete = await fakeCategoriesRepository.findByIdOrFail(
      createdCategory.id
    );

    const deletedCategoryResponse = await deleteCategoryService.execute(
      createdCategory.id
    );

    expect.assertions(5);

    expect(categoryBeforeDelete).toMatchObject({
      id: createdCategory.id,
      name: createdCategory.name,
    });
    expect(deleteCategorySpy).toHaveBeenCalledTimes(1);
    expect(deletedCategoryResponse).toBeUndefined();

    await fakeCategoriesRepository
      .findByIdOrFail(createdCategory.id)
      .catch(err => {
        expect(err).toBeInstanceOf(EntityNotFoundError);
        expect(err).toMatchObject({
          name: 'EntityNotFound',
          message: `Could not find any entity of type "Category" matching: ""`,
        });
      });
  });

  it('Should not be able to delete a non-existing category', async () => {
    const deleteCategorySpy = jest.spyOn(
      fakeCategoriesRepository,
      'deleteOrFail'
    );

    expect.assertions(3);

    await deleteCategoryService.execute('invalid-category-id').catch(err => {
      expect(err).toBeInstanceOf(EntityNotFoundError);
      expect(err).toMatchObject({
        name: 'EntityNotFound',
        message: `Could not find any entity of type "Category" matching: ""`,
      });
      expect(deleteCategorySpy).toHaveBeenCalledTimes(1);
    });
  });
});
