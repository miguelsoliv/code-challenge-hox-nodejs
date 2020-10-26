import { parseISO, isAfter } from 'date-fns';

import AppError from '../../errors/AppError';
import Product from '../../models/Product';
import { IProductsRepository } from '../../repositories/products';

interface IRequest {
  name: string;
  category_id: string;
  expiration_date: string;
  manufacturing_date: string;
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
    const parsedExpirationDate = parseISO(expiration_date);
    const parsedManufacturingDate = parseISO(manufacturing_date);

    if (isAfter(parsedManufacturingDate, parsedExpirationDate)) {
      throw new AppError(
        'The manufacturing date cannot be later than the expiration date'
      );
    }

    const product = await this.productsRepo.create({
      name,
      category_id,
      expiration_date: parsedExpirationDate,
      manufacturing_date: parsedManufacturingDate,
      perishable_product,
      price,
    });

    return { product };
  };
}

export default CreateProductService;
