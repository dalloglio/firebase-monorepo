import { MockUseCase } from "../../../../@shared/mocks";
import { SetIncrementIdUseCase } from "../../../../application/set-increment-id";
import {
  SetIncrementIdHandler,
  setIncrementIdHandler,
} from "./set-increment-id";

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: jest.fn().mockImplementation(() => ({
    collection: jest.fn().mockImplementation(() => ({
      doc: jest.fn().mockImplementation(() => ({
        get: jest.fn().mockImplementation(() => ({
          exists: true,
        })),
        update: jest.fn(),
      })),
    })),
  })),
}));

describe("SetIncrementIdHandler", () => {
  let handler: SetIncrementIdHandler;
  let useCase: SetIncrementIdUseCase;

  beforeEach(() => {
    useCase = new MockUseCase();
    handler = new SetIncrementIdHandler(useCase);
  });

  it("should get next increment id and set for user", async () => {
    await handler.handle("id");
    expect(useCase.execute).toHaveBeenCalled();
  });

  it("should log error if something wrong occurs", async () => {
    const error = new Error("error");
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementationOnce(() => {});
    jest.spyOn(useCase, "execute").mockRejectedValueOnce(error);
    await handler.handle("id");
    expect(useCase.execute).toHaveBeenCalled();
    expect(useCase.execute).toHaveBeenCalledWith({ id: "id", incrementId: 1 });
    expect(console.error).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(error);
    consoleSpy.mockRestore();
  });

  describe("setIncrementIdHandler", () => {
    it("should execute the handler", async () => {
      const handleSpy = jest.spyOn(SetIncrementIdHandler.prototype, "handle");
      const snap = { id: "id" };
      await setIncrementIdHandler.run(snap as any, {});
      expect(handleSpy).toHaveBeenCalledTimes(1);
      expect(handleSpy).toHaveBeenCalledWith(snap.id);
    });
  });
});
