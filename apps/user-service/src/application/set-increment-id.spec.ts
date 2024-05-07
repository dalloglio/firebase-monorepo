import { MockRepository } from "../@shared/mocks";
import { SetIncrementIdUseCase } from "./set-increment-id";

describe("SetIncrementIdUseCase", () => {
  const repository = new MockRepository();

  it("should set the increment id attribute", async () => {
    repository.exists.mockResolvedValue(true);
    repository.setIncrementId.mockResolvedValue(undefined);
    const useCase = new SetIncrementIdUseCase(repository);
    const result = await useCase.execute({ id: "id", incrementId: 1 });
    expect(result).toBeUndefined();
    expect(repository.exists).toHaveBeenCalledTimes(1);
    expect(repository.exists).toHaveBeenCalledWith("id");
    expect(repository.setIncrementId).toHaveBeenCalledTimes(1);
    expect(repository.setIncrementId).toHaveBeenCalledWith("id", 1);
  });

  it("should throw an error if user not found", () => {
    repository.exists.mockResolvedValue(false);
    const useCase = new SetIncrementIdUseCase(repository);
    expect(useCase.execute({ id: "id", incrementId: 1 })).rejects.toThrow(
      "User not found"
    );
  });
});
