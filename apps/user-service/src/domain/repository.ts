import { User } from "./entity";

export interface UserRepository {
  save(user: User): Promise<User>;
  exists(id: string): Promise<boolean>;
  setIncrementId(id: string, incrementId: number): Promise<void>;
}
