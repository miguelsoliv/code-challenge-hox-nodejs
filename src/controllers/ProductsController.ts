import { Response, RequestHandler } from 'express';

import { IProductsRepository } from '../repositories/products';
import {
  CreateProductService,
  UpdateProductService,
  DeleteProductService,
  ShowProductService,
  ListProductService,
} from '../services/products';

class ProductsController {
  constructor(private productsRepo: IProductsRepository) {}

  store: RequestHandler = async (request, response): Promise<Response> => {
    const {
      name,
      category_id,
      expiration_date,
      manufacturing_date,
      perishable_product,
      price,
    } = request.body;

    const createProductService = new CreateProductService(this.productsRepo);

    const productData = await createProductService.execute({
      name,
      category_id,
      expiration_date,
      manufacturing_date,
      perishable_product,
      price,
    });

    return response.status(200).json(productData);
  };

  update: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;
    const {
      name,
      category_id,
      expiration_date,
      manufacturing_date,
      perishable_product,
      price,
    } = request.body;

    const updateProductService = new UpdateProductService(this.productsRepo);

    const productData = await updateProductService.execute({
      id,
      name,
      category_id,
      expiration_date,
      manufacturing_date,
      perishable_product,
      price,
    });

    return response.status(200).json(productData);
  };

  remove: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;

    const deleteProductService = new DeleteProductService(this.productsRepo);

    await deleteProductService.execute(id);

    return response.status(204).send();
  };

  show: RequestHandler = async (request, response): Promise<Response> => {
    const { id } = request.params;

    const showProductService = new ShowProductService(this.productsRepo);

    const productData = await showProductService.execute(id);

    return response.status(200).json(productData);
  };

  index: RequestHandler = async (_, response): Promise<Response> => {
    const listProductService = new ListProductService(this.productsRepo);

    const productsData = await listProductService.execute();

    return response.status(200).json(productsData);
  };
}

export default ProductsController;