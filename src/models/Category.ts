import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';

import BaseModel from './BaseModel';
import Product from './Product';

@Entity('categories')
class Category extends BaseModel {
  @Column()
  name: string;

  @OneToMany(() => Product, product => product.category)
  @JoinColumn({ name: 'category_id' })
  products: Product[];
}

export default Category;
