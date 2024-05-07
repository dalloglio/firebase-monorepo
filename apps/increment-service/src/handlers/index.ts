import {
  DocumentReference,
  FieldValue,
  Firestore,
} from "firebase-admin/firestore";

export abstract class IncrementHandler {
  abstract collectionName: string;

  constructor(private readonly db: Firestore) {}

  async handle(ref: DocumentReference): Promise<void> {
    await ref.update({
      increment_id: await this.getNextIncrementId(),
    });
  }

  private async getNextIncrementId(): Promise<number> {
    let counter = 1;
    const ref = this.db.collection("increments").doc(this.collectionName);
    const counters = await ref.get();
    const value = counters.get("value");
    if (counters.exists && value) {
      counter += value;
      await ref.update({ value: FieldValue.increment(1) });
    } else {
      await ref.set({ value: FieldValue.increment(1) });
    }
    return counter;
  }
}
