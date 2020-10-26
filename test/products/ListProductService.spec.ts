import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { FakeProductsRepository } from '../../src/repositories/products';
import { ListProductService } from '../../src/services/products';
import { createRandomProduct } from '../factories';

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let listProductService: ListProductService;
// TODO: A listagem deve ter a possibilidade de ordenação dos campos e com uma paginação de 10 produtos por página.
beforeAll(async () => {
  fakeProductsRepository = new FakeProductsRepository();
  fakeCategoriesRepository = new FakeCategoriesRepository();
  listProductService = new ListProductService(fakeProductsRepository);
});

describe('ENDPOINT /products', () => {
  it('Should be able to list all products', async () => {
    const findAllProductsSpy = jest.spyOn(fakeProductsRepository, 'findAll');

    const createdProduct1 = await createRandomProduct(
      fakeProductsRepository,
      fakeCategoriesRepository
    );
    const createdProduct2 = await createRandomProduct(
      fakeProductsRepository,
      fakeCategoriesRepository
    );
    const createdProduct3 = await createRandomProduct(
      fakeProductsRepository,
      fakeCategoriesRepository
    );

    const listedProductsResponse = await listProductService.execute();

    expect(findAllProductsSpy).toHaveBeenCalledTimes(1);
    expect(listedProductsResponse).toEqual<typeof listedProductsResponse>({
      products: [createdProduct1, createdProduct2, createdProduct3],
    });
  });
});
