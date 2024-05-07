import { User } from "./entity";

describe("User Entity", () => {
  describe("Create User", () => {
    it("should create user", () => {
      const user = new User("id", "name");
      expect(user).toBeDefined();
      expect(user.id).toBe("id");
      expect(user.name).toBe("name");
      expect(user.incrementId).toBeUndefined();
    });

    it("should throw an error if id is empty", () => {
      expect(() => new User("", "name")).toThrow("Id is required");
    });

    it("should throw an error if name is empty", () => {
      expect(() => new User("id", "")).toThrow("Name is required");
    });
  });
});
