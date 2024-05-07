import { getFirestore } from "firebase-admin/firestore";
import { firestore } from "firebase-functions/v1";
import { SetIncrementIdUseCase } from "../../../../application/set-increment-id";
import { FirestoreUserRepository } from "../../../repository";

export class SetIncrementIdHandler {
  constructor(private readonly useCase: SetIncrementIdUseCase) {}

  async handle(id: string): Promise<void> {
    try {
      const incrementId = 1;
      await this.useCase.execute({ id, incrementId });
    } catch (error) {
      console.error(error);
    }
  }
}

export const setIncrementIdHandler = firestore
  .document("users/{userId}")
  .onCreate(async (snap) => {
    const repository = new FirestoreUserRepository(getFirestore());
    const useCase = new SetIncrementIdUseCase(repository);
    const handler = new SetIncrementIdHandler(useCase);
    await handler.handle(snap.id);
  });
