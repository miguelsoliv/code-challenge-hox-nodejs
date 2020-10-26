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
