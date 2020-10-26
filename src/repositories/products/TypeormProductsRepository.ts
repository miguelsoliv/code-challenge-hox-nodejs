import { getRepository } from 'typeorm';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';

import {
  ICreateProductDTO,
  IUpdateProductDTO,
  IListAllProductsDTO,
} from '../../dtos/productDTO';
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

  async deleteOrFail(id: string): Promise<void> {
    const deleteResult = await getRepository(Product)
      .createQueryBuilder()
      .delete()
      .where('id = :id', {
        id,
      })
      .returning('*')
      .execute();

    if (!deleteResult.raw[0]) throw new EntityNotFoundError(Product, '');
  }

  async findByIdOrFail(id: string): Promise<Product> {
    return getRepository(Product).findOneOrFail(id);
  }

  async findAll({
    page,
    categoryName,
    orderBy,
  }: IListAllProductsDTO): Promise<Product[]> {
    const productsQueryBuilder = getRepository(Product)
      .createQueryBuilder('prod')
      .leftJoinAndSelect('prod.category', 'categ');

    if (orderBy) productsQueryBuilder.orderBy(`prod.${orderBy}`, 'ASC');

    if (categoryName !== 'all') {
      productsQueryBuilder.where('categ.name = :name', { name: categoryName });
    }

    return productsQueryBuilder
      .skip((page - 1) * 10)
      .take(10)
      .getMany();
  }
}

export default TypeormProductsRepository;
