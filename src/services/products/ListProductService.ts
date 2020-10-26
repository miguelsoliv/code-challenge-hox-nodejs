import { IListAllProductsDTO } from '../../dtos/productDTO';
import Product from '../../models/Product';
import { IProductsRepository } from '../../repositories/products';

interface IResponse {
  products: Product[];
}

class ListProductService {
  constructor(private productsRepo: IProductsRepository) {}

  execute = async (data: IListAllProductsDTO): Promise<IResponse> => {
    const products = await this.productsRepo.findAll(data);

    return { products };
  };
}

export default ListProductService;
