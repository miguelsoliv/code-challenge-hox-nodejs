import Product from '../models/Product';
import categoriesView, { ICategoryView } from './categories_view';

interface IProductView {
  id: string;
  category_id?: string;
  name: string;
  manufacturing_date: Date;
  perishable_product: boolean;
  expiration_date: Date;
  price: number;
  category?: ICategoryView;
}

export default {
  render(product: Product): IProductView {
    return {
      id: product.id,
      category_id: product.category ? undefined : product.category_id,
      name: product.name,
      manufacturing_date: product.manufacturing_date,
      perishable_product: product.perishable_product,
      expiration_date: product.expiration_date,
      price: Number(product.price),
      category: product.category && categoriesView.render(product.category),
    };
  },

  renderMany(products: Product[]): IProductView[] {
    return products.map(product => this.render(product));
  },
};
