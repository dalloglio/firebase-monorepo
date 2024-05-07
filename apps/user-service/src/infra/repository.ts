import { Firestore } from "firebase-admin/firestore";
import { User } from "../domain/entity";
import { UserRepository } from "../domain/repository";

export class FirestoreUserRepository implements UserRepository {
  private readonly collection = this.db.collection("users");

  constructor(private readonly db: Firestore) {}

  async save(user: User): Promise<User> {
    const { id, name } = user;
    await this.collection.doc(id).set({ name });
    return user;
  }
}
