import { Entity, Column } from 'typeorm';

import BaseModel from './BaseModel';

@Entity('categories')
class Category extends BaseModel {
  @Column()
  name: string;
}

export default Category;
