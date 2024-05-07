import { Firestore } from "firebase-admin/firestore";
import { MockFirestore } from "../@shared/mocks";
import { User } from "../domain/entity";
import { FirestoreUserRepository } from "./repository";

describe("FirestoreUserRepository", () => {
  let firestore: Firestore;
  let repository: FirestoreUserRepository;

  beforeEach(() => {
    firestore = new MockFirestore() as unknown as Firestore;
    repository = new FirestoreUserRepository(firestore);
  });

  describe("save", () => {
    it("should save user", async () => {
      const user = new User("id", "name");
      const savedUser = await repository.save(user);
      expect(savedUser).toEqual(user);
      expect(firestore.collection).toHaveBeenCalledTimes(1);
      expect(firestore.collection).toHaveBeenCalledWith("users");
      expect(firestore.collection("users").doc).toHaveBeenCalledTimes(1);
      expect(firestore.collection("users").doc).toHaveBeenCalledWith("id");
      expect(firestore.collection("users").doc("id").set).toHaveBeenCalledTimes(
        1
      );
      expect(firestore.collection("users").doc("id").set).toHaveBeenCalledWith({
        name: "name",
      });
    });
  });

  describe("exists", () => {
    it("should check if user exists", async () => {
      const exists = await repository.exists("id");
      expect(exists).toBe(true);
      expect(firestore.collection).toHaveBeenCalledTimes(1);
      expect(firestore.collection).toHaveBeenCalledWith("users");
      expect(firestore.collection("users").doc).toHaveBeenCalledTimes(1);
      expect(firestore.collection("users").doc).toHaveBeenCalledWith("id");
      expect(firestore.collection("users").doc("id").get).toHaveBeenCalledTimes(
        1
      );
      expect(
        firestore.collection("users").doc("id").get
      ).toHaveBeenCalledWith();
    });
  });

  describe("setIncrementId", () => {
    it("should update the increment_id attribute", async () => {
      await repository.setIncrementId("id", 1);
      expect(firestore.collection).toHaveBeenCalledTimes(1);
      expect(firestore.collection).toHaveBeenCalledWith("users");
      expect(firestore.collection("users").doc).toHaveBeenCalledTimes(1);
      expect(firestore.collection("users").doc).toHaveBeenCalledWith("id");
      expect(
        firestore.collection("users").doc("id").update
      ).toHaveBeenCalledTimes(1);
      expect(
        firestore.collection("users").doc("id").update
      ).toHaveBeenCalledWith({ increment_id: 1 });
    });
  });
});
