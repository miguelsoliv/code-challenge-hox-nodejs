import Product from '../../models/Product';
import { IProductsRepository } from '../../repositories/products';

interface IResponse {
  products: Product[];
}

class ListProductService {
  constructor(private productsRepo: IProductsRepository) {}

  execute = async (): Promise<IResponse> => {
    const products = await this.productsRepo.findAll();

    return { products };
  };
}

export default ListProductService;
