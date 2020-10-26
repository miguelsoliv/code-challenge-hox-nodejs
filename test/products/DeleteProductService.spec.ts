import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { FakeProductsRepository } from '../../src/repositories/products';
import { DeleteProductService } from '../../src/services/products';
import { createRandomProduct } from '../factories';

let fakeProductsRepository: FakeProductsRepository;
let deleteProductService: DeleteProductService;

beforeAll(async () => {
  fakeProductsRepository = new FakeProductsRepository();
  deleteProductService = new DeleteProductService(fakeProductsRepository);
});

describe('ENDPOINT /products', () => {
  it('Should be able to delete a product', async () => {
    const deleteProductSpy = jest.spyOn(fakeProductsRepository, 'deleteOrFail');

    const createdProduct = await createRandomProduct(
      fakeProductsRepository,
      new FakeCategoriesRepository()
    );

    const productBeforeDelete = await fakeProductsRepository.findByIdOrFail(
      createdProduct.id
    );

    const deletedProductResponse = await deleteProductService.execute(
      createdProduct.id
    );

    expect.assertions(5);

    expect(productBeforeDelete).toMatchObject({
      id: createdProduct.id,
      name: createdProduct.name,
    });
    expect(deleteProductSpy).toHaveBeenCalledTimes(1);
    expect(deletedProductResponse).toBeUndefined();

    await fakeProductsRepository
      .findByIdOrFail(createdProduct.id)
      .catch(err => {
        expect(err).toBeInstanceOf(EntityNotFoundError);
        expect(err).toMatchObject({
          name: 'EntityNotFound',
          message: `Could not find any entity of type "Product" matching: ""`,
        });
      });
  });

  it('Should not be able to delete a non-existing product', async () => {
    const deleteProductSpy = jest.spyOn(fakeProductsRepository, 'deleteOrFail');

    expect.assertions(3);

    await deleteProductService.execute('invalid-product-id').catch(err => {
      expect(err).toBeInstanceOf(EntityNotFoundError);
      expect(err).toMatchObject({
        name: 'EntityNotFound',
        message: `Could not find any entity of type "Product" matching: ""`,
      });
      expect(deleteProductSpy).toHaveBeenCalledTimes(1);
    });
  });
});
