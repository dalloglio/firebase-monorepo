import { User } from "./entity";

export interface UserRepository {
  save(user: User): Promise<User>;
}
