import Product from '../../models/Product';
import { IProductsRepository } from '../../repositories/products';

interface IResponse {
  product: Product;
}

class ShowProductService {
  constructor(private productsRepo: IProductsRepository) {}

  execute = async (id: string): Promise<IResponse> => {
    const product = await this.productsRepo.findByIdOrFail(id);

    return { product };
  };
}

export default ShowProductService;
