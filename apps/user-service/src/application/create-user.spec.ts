import { MockRepository } from "../@shared/mocks";
import { UserFactory } from "../domain/factory";
import { CreateUserUseCase } from "./create-user";

describe("CreateUserUseCase", () => {
  const user = UserFactory.create("name");
  const repository = new MockRepository();

  it("should create a new user", async () => {
    repository.save.mockResolvedValue(user);
    const userCase = new CreateUserUseCase(repository);
    const result = await userCase.execute({ name: user.name });
    expect(repository.save).toHaveBeenCalledTimes(1);
    expect(result).toEqual({
      id: user.id,
      name: user.name,
    });
  });
});
