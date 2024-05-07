import { Request, Response } from "express";
import { MockRequest, MockResponse, MockUseCase } from "../@shared/mocks";
import { CreateUserUseCase } from "../application/create-user";
import { UserController } from "./controller";

describe("UserController", () => {
  let useCase: CreateUserUseCase;
  let controller: UserController;
  let request: Request;
  let response: Response;

  const consoleErrorSpy = jest.spyOn(global.console, "error").mockReturnValue();

  beforeEach(() => {
    useCase = new MockUseCase();
    controller = new UserController(useCase);
    request = new MockRequest();
    response = new MockResponse();
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  it("should create a new user", async () => {
    jest
      .spyOn(useCase, "execute")
      .mockResolvedValueOnce({ id: "id", name: "name" });
    await controller.createUser(request, response);
    expect(useCase.execute).toHaveBeenCalledTimes(1);
    expect(useCase.execute).toHaveBeenCalledWith({ name: "name" });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith({ id: "id", name: "name" });
  });

  it("should return a 500 status code if an error occurs", async () => {
    jest.spyOn(useCase, "execute").mockRejectedValueOnce(new Error("Error"));
    try {
      await controller.createUser(request, response);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(useCase.execute).toHaveBeenCalledTimes(1);
      expect(useCase.execute).toHaveBeenCalledWith({ name: "name" });
      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({ error: "Error" });
    }
  });
});
