import { format } from 'date-fns';

import Product from '../models/Product';
import categoriesView, { ICategoryView } from './categories_view';

export interface IProductView {
  id: string;
  category_id?: string;
  name: string;
  manufacturing_date: string;
  expiration_date: string;
  perishable_product: boolean;
  price: number;
  category?: ICategoryView;
}

export default {
  render(product: Product): IProductView {
    return {
      id: product.id,
      category_id: product.category ? undefined : product.category_id,
      name: product.name,
      manufacturing_date: format(
        product.manufacturing_date,
        'yyyy-MM-dd HH:mm:ss SS'
      ),
      expiration_date: format(
        product.expiration_date,
        'yyyy-MM-dd HH:mm:ss SS'
      ),
      perishable_product: product.perishable_product,
      price: Number(product.price),
      category: product.category && categoriesView.render(product.category),
    };
  },

  renderMany(products: Product[]): IProductView[] {
    return products.map(product => this.render(product));
  },
};
