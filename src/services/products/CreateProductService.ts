import Product from '../../models/Product';
import { IProductsRepository } from '../../repositories/products';

interface IRequest {
  name: string;
  category_id: string;
  expiration_date: Date;
  manufacturing_date: Date;
  perishable_product: boolean;
  price: number;
}

interface IResponse {
  product: Product;
}

class CreateProductService {
  constructor(private productsRepo: IProductsRepository) {}

  execute = async ({
    name,
    category_id,
    expiration_date,
    manufacturing_date,
    perishable_product,
    price,
  }: IRequest): Promise<IResponse> => {
    const product = await this.productsRepo.create({
      name,
      category_id,
      expiration_date,
      manufacturing_date,
      perishable_product,
      price,
    });

    return { product };
  };
}

export default CreateProductService;
