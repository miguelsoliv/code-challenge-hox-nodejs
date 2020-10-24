import User from '../models/User';

export interface IUserView {
  id: string;
  name: string;
  email: string;
}

export default {
  render(user: User): IUserView {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};
