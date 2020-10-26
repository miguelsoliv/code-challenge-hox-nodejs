import faker from 'faker';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import {
  ICreateProductDTO,
  IUpdateProductDTO,
  IListAllProductsDTO,
} from '../../dtos/productDTO';
import Product from '../../models/Product';
import IProductsRepository from './IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  async create(data: ICreateProductDTO): Promise<Product> {
    const product = {
      ...data,
      id: faker.random.uuid(),
      created_at: faker.date.past(),
      updated_at: faker.date.recent(),
    };

    this.products.push(product);

    return product;
  }

  async updateOrFail(data: IUpdateProductDTO): Promise<Product> {
    const findProduct = await this.findByIdOrFail(data.id);

    const productIndex = this.products.findIndex(
      product => product.id === findProduct.id
    );

    this.products[productIndex] = findProduct;

    return {
      ...this.products[productIndex],
      category: undefined,
    };
  }

  async deleteOrFail(id: string): Promise<void> {
    const findProduct = await this.findByIdOrFail(id);

    const productIndex = this.products.findIndex(
      product => product.id === findProduct.id
    );

    this.products.splice(productIndex);
  }

  async findByIdOrFail(id: string): Promise<Product> {
    const findProduct = this.products.find(product => product.id === id);

    if (!findProduct) throw new EntityNotFoundError(Product, '');

    return findProduct;
  }

  async findAll({
    page,
    categoryName,
    orderBy,
  }: IListAllProductsDTO): Promise<Product[]> {
    const startIndex = page * 10 - 10;
    const endIndex = page * 10;

    return this.products.filter((product, index) => {
      if (startIndex > index || index >= endIndex) return null;

      if (categoryName === 'all') return product;

      return product.category?.name === categoryName;
    });
  }
}

export default FakeProductsRepository;
