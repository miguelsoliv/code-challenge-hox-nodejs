import Product from '../../src/models/Product';
import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { FakeProductsRepository } from '../../src/repositories/products';
import { ListProductService } from '../../src/services/products';
import { createRandomProduct } from '../factories';

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let listProductService: ListProductService;
let products: Product[] = [];

beforeAll(async () => {
  fakeProductsRepository = new FakeProductsRepository();
  fakeCategoriesRepository = new FakeCategoriesRepository();
  listProductService = new ListProductService(fakeProductsRepository);

  const productsPromises: Promise<Product>[] = [];

  for (let i = 11; i > 0; i -= 1) {
    productsPromises.push(
      createRandomProduct(fakeProductsRepository, fakeCategoriesRepository)
    );
  }

  products = await Promise.all(productsPromises);
});

describe('ENDPOINT /products', () => {
  it('Should be able to list the first 10 products', async () => {
    const findAllProductsSpy = jest.spyOn(fakeProductsRepository, 'findAll');

    const listedProductsResponse = await listProductService.execute({
      page: 1,
      categoryName: 'all',
    });

    expect.objectContaining<typeof listedProductsResponse>({
      products: [...products],
    });
    expect(findAllProductsSpy).toHaveBeenCalledTimes(1);
    expect(listedProductsResponse.products).toHaveLength(10);
  });

  it('Should be able to list the last product', async () => {
    const findAllProductsSpy = jest.spyOn(fakeProductsRepository, 'findAll');

    const listedProductsResponse = await listProductService.execute({
      page: 2,
      categoryName: 'all',
    });

    expect.objectContaining<typeof listedProductsResponse>({
      products: [...products],
    });
    expect(findAllProductsSpy).toHaveBeenCalledTimes(1);
    expect(listedProductsResponse.products).toHaveLength(1);
  });
});
