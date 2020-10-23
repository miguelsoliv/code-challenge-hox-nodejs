import { ICreateUserDTO } from '../../dtos/userDTOs';
import User from '../../models/User';

export default interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
}
