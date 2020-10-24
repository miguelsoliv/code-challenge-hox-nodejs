import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';

import BaseModel from './BaseModel';
import Category from './Category';

@Entity('products')
class Product extends BaseModel {
  @Column()
  name: string;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, {
    eager: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  manufacturing_date: Date;

  @Column()
  perishable_product: boolean;

  @Column()
  expiration_date: Date;

  @Column()
  price: number;
}

export default Product;
