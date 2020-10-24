import Category from '../models/Category';

export interface ICategoryView {
  id: string;
  name: string;
}

export default {
  render(category: Category): ICategoryView {
    return {
      id: category.id,
      name: category.name,
    };
  },

  renderMany(categories: Category[]): ICategoryView[] {
    return categories.map(category => this.render(category));
  },
};
