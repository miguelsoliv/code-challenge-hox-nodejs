import { ICreateCategoryDTO, IUpdateCategoryDTO } from '../../dtos/categoryDTO';
import Category from '../../models/Category';

export default interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;
  updateOrFail(data: IUpdateCategoryDTO): Promise<Category>;
  deleteOrFail(id: string): Promise<void>;
  findByIdOrFail(id: string): Promise<Category>;
  findAll(): Promise<Category[]>;
}
