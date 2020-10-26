import { format, addHours } from 'date-fns';
import faker from 'faker';

import AppError from '../../src/errors/AppError';
import Category from '../../src/models/Category';
import { FakeCategoriesRepository } from '../../src/repositories/categories';
import { FakeProductsRepository } from '../../src/repositories/products';
import { CreateProductService } from '../../src/services/products';

let fakeProductsRepository: FakeProductsRepository;
let fakeCategoriesRepository: FakeCategoriesRepository;
let createProductService: CreateProductService;
let createdCategory: Category;

beforeAll(async () => {
  fakeProductsRepository = new FakeProductsRepository();
  fakeCategoriesRepository = new FakeCategoriesRepository();
  createProductService = new CreateProductService(fakeProductsRepository);

  createdCategory = await fakeCategoriesRepository.create({
    name: faker.name.findName(),
  });
});

describe('ENDPOINT /products', () => {
  it('Should be able to create a product', async () => {
    const createProductSpy = jest.spyOn(fakeProductsRepository, 'create');

    const productData = {
      category_id: createdCategory.id,
      name: faker.name.findName(),
      price: faker.random.float(),
      expiration_date: faker.date.future(),
      manufacturing_date: faker.date.past(),
      perishable_product: faker.random.boolean(),
    };

    const createdProductResponse = await createProductService.execute({
      ...productData,
      expiration_date: format(
        productData.expiration_date,
        'yyyy-MM-dd HH:mm:ss.SSS'
      ),
      manufacturing_date: format(
        productData.manufacturing_date,
        'yyyy-MM-dd HH:mm:ss.SSS'
      ),
    });

    const {
      name,
      price,
      expiration_date,
      manufacturing_date,
      perishable_product,
    } = productData;

    expect(createProductSpy).toHaveBeenCalledTimes(1);
    expect(createdProductResponse).toEqual({
      product: {
        id: createdProductResponse.product.id,
        category_id: createdCategory.id,
        name,
        price,
        expiration_date,
        manufacturing_date,
        perishable_product,
        created_at: createdProductResponse.product.created_at,
        updated_at: createdProductResponse.product.updated_at,
      },
    });
  });

  it('Should not be able to create a product with a manufacturing date later than its expiration date', async () => {
    const expirationDate = faker.date.future();

    const productData = {
      category_id: createdCategory.id,
      name: faker.name.findName(),
      price: faker.random.float(),
      expiration_date: expirationDate,
      manufacturing_date: addHours(expirationDate, 1),
      perishable_product: faker.random.boolean(),
    };

    expect.assertions(2);

    await createProductService
      .execute({
        ...productData,
        expiration_date: format(
          productData.expiration_date,
          'yyyy-MM-dd HH:mm:ss.SSS'
        ),
        manufacturing_date: format(
          productData.manufacturing_date,
          'yyyy-MM-dd HH:mm:ss.SSS'
        ),
      })
      .catch(err => {
        expect(err).toBeInstanceOf(AppError);
        expect(err).toEqual<AppError>({
          statusCode: 400,
          message:
            'The manufacturing date cannot be later than the expiration date',
        });
      });
  });
});
