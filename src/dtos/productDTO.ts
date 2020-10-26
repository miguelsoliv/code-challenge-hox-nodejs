import Category from '../models/Category';

export interface ICreateProductDTO {
  name: string;
  category_id: string;
  manufacturing_date: Date;
  perishable_product: boolean;
  expiration_date: Date;
  price: number;
  category?: Category;
}

export interface IUpdateProductDTO extends ICreateProductDTO {
  id: string;
}

export type allowedPropertiesFilter =
  | 'name'
  | 'manufacturing_date'
  | 'perishable_product'
  | 'expiration_date'
  | 'price';

export interface IListAllProductsDTO {
  page: number;
  categoryName: string;
  orderBy?: allowedPropertiesFilter;
}
