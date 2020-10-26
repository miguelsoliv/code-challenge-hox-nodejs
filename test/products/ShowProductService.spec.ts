import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { FakeProductsRepository } from '../../src/repositories/products';
import { ShowProductService } from '../../src/services/products';
import { createRandomProduct } from '../factories';

let fakeProductsRepository: FakeProductsRepository;
let showProductService: ShowProductService;

beforeAll(async () => {
  fakeProductsRepository = new FakeProductsRepository();
  showProductService = new ShowProductService(fakeProductsRepository);
});

describe('ENDPOINT /products', () => {
  it('Should be able to show a product', async () => {
    const findProductSpy = jest.spyOn(fakeProductsRepository, 'findByIdOrFail');

    const createdProduct = await createRandomProduct(
      fakeProductsRepository,
      new FakeCategoriesRepository()
    );

    const showedProductResponse = await showProductService.execute(
      createdProduct.id
    );

    const {
      id,
      category_id,
      name,
      price,
      expiration_date,
      manufacturing_date,
      perishable_product,
      created_at,
      updated_at,
      category,
    } = createdProduct;

    expect(findProductSpy).toHaveBeenCalledTimes(1);
    expect(showedProductResponse).toEqual<typeof showedProductResponse>({
      product: {
        id,
        category_id,
        name,
        price,
        expiration_date,
        manufacturing_date,
        perishable_product,
        created_at,
        updated_at,
        category,
      },
    });
  });

  it('Should not be able to show a non-existing product', async () => {
    const findProductSpy = jest.spyOn(fakeProductsRepository, 'findByIdOrFail');

    expect.assertions(3);

    await showProductService.execute('invalid-product-id').catch(err => {
      expect(err).toBeInstanceOf(EntityNotFoundError);
      expect(err).toMatchObject({
        name: 'EntityNotFound',
        message: `Could not find any entity of type "Product" matching: ""`,
      });
      expect(findProductSpy).toHaveBeenCalledTimes(1);
    });
  });
});
