import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { ListCategoryService } from '../../src/services/categories';
import { createRandomCategory } from '../factories';

let fakeCategoriesRepository: FakeCategoriesRepository;
let listCategoryService: ListCategoryService;

beforeAll(async () => {
  fakeCategoriesRepository = new FakeCategoriesRepository();
  listCategoryService = new ListCategoryService(fakeCategoriesRepository);
});

describe('ENDPOINT /categories', () => {
  it('Should be able to list all categories', async () => {
    const findAllCategoriesSpy = jest.spyOn(
      fakeCategoriesRepository,
      'findAll'
    );

    const createdCategory1 = await createRandomCategory(
      fakeCategoriesRepository
    );
    const createdCategory2 = await createRandomCategory(
      fakeCategoriesRepository
    );
    const createdCategory3 = await createRandomCategory(
      fakeCategoriesRepository
    );

    const listedCategoriesResponse = await listCategoryService.execute();

    expect(findAllCategoriesSpy).toHaveBeenCalledTimes(1);
    expect(listedCategoriesResponse).toEqual<typeof listedCategoriesResponse>({
      categories: [createdCategory1, createdCategory2, createdCategory3],
    });
  });
});
