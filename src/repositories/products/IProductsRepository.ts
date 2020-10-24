import { ICreateProductDTO, IUpdateProductDTO } from '../../dtos/productDTO';
import Product from '../../models/Product';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  updateOrFail(data: IUpdateProductDTO): Promise<Product>;
  delete(id: string): Promise<void>;
  findByIdOrFail(id: string): Promise<Product>;
  findAll(): Promise<Product[]>;
}
