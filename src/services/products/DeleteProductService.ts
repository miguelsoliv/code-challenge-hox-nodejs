import { IProductsRepository } from '../../repositories/products';

class DeleteProductService {
  constructor(private productsRepo: IProductsRepository) {}

  execute = async (id: string): Promise<void> => {
    await this.productsRepo.delete(id);
  };
}

export default DeleteProductService;
