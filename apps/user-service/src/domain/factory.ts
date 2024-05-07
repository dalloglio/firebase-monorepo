import { randomUUID } from "crypto";
import { User } from "./entity";

export class UserFactory {
  static create(name: string): User {
    return new User(randomUUID(), name);
  }
}
