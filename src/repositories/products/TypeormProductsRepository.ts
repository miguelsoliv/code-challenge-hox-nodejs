import { getRepository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import { ICreateProductDTO, IUpdateProductDTO } from '../../dtos/productDTO';
import Product from '../../models/Product';
import IProductsRepository from './IProductsRepository';

class TypeormProductsRepository implements IProductsRepository {
  async create(data: ICreateProductDTO): Promise<Product> {
    const productsRepo = getRepository(Product);

    const product = productsRepo.create(data);

    return productsRepo.save(product);
  }

  async updateOrFail(data: IUpdateProductDTO): Promise<Product> {
    const updateResult = await getRepository(Product)
      .createQueryBuilder()
      .update()
      .set(data)
      .where('id = :id', {
        id: data.id,
      })
      .returning('*')
      .execute();

    if (!updateResult.raw[0]) throw new EntityNotFoundError(Product, '');

    return updateResult.raw[0];
  }

  async delete(id: string): Promise<void> {
    await getRepository(Product).delete(id);
  }

  async findByIdOrFail(id: string): Promise<Product> {
    return getRepository(Product).findOneOrFail(id);
  }

  async findAll(): Promise<Product[]> {
    return getRepository(Product).find();
  }
}

export default TypeormProductsRepository;
