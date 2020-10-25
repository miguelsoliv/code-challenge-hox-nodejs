import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { ShowCategoryService } from '../../src/services/categories';
import { createRandomCategory } from '../factories';

let fakeCategoriesRepository: FakeCategoriesRepository;
let showCategoryService: ShowCategoryService;

beforeAll(async () => {
  fakeCategoriesRepository = new FakeCategoriesRepository();
  showCategoryService = new ShowCategoryService(fakeCategoriesRepository);
});

describe('ENDPOINT /categories', () => {
  it('Should be able to show a category', async () => {
    const findCategorySpy = jest.spyOn(
      fakeCategoriesRepository,
      'findByIdOrFail'
    );

    const createdCategory = await createRandomCategory(
      fakeCategoriesRepository
    );

    const showedCategoryResponse = await showCategoryService.execute(
      createdCategory.id
    );

    const { id, name, created_at, updated_at } = createdCategory;

    expect(findCategorySpy).toHaveBeenCalledTimes(1);
    expect(showedCategoryResponse).toEqual<typeof showedCategoryResponse>({
      category: {
        id,
        name,
        created_at,
        updated_at,
      },
    });
  });

  it('Should not be able to show a non-existing category', async () => {
    const findCategorySpy = jest.spyOn(
      fakeCategoriesRepository,
      'findByIdOrFail'
    );

    expect.assertions(3);

    await showCategoryService.execute('invalid-category-id').catch(err => {
      expect(err).toBeInstanceOf(EntityNotFoundError);
      expect(err).toMatchObject({
        name: 'EntityNotFound',
        message: `Could not find any entity of type "Category" matching: ""`,
      });
      expect(findCategorySpy).toHaveBeenCalledTimes(1);
    });
  });
});
