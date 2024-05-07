import { User } from "./entity";
import { UserFactory } from "./factory";

describe("UserFactory", () => {
  it("should create a instance of user", () => {
    expect(UserFactory.create("name")).toBeInstanceOf(User);
  });
});
