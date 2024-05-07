import express from "express";
import request from "supertest";
import { UserRouter } from "./router";
import { CreateUserUseCase } from "../application/create-user";

jest.mock("firebase-admin/firestore", () => ({
  getFirestore: jest.fn().mockImplementation(() => ({
    collection: jest.fn().mockImplementation(() => ({
      doc: jest.fn().mockImplementation(() => ({
        set: jest.fn(),
      })),
    })),
  })),
}));

describe("UserRouter", () => {
  let app: express.Express;

  const consoleErrorSpy = jest.spyOn(global.console, "error").mockReturnValue();

  beforeEach(() => {
    app = express();
    app.use(express.json());
    UserRouter.route(app);
  });

  afterAll(() => {
    consoleErrorSpy.mockRestore();
  });

  describe("Register express router to create a new user", () => {
    describe("POST Create user /users", () => {
      it("should create a new user", async () => {
        CreateUserUseCase.prototype.execute = jest.fn().mockResolvedValue({
          id: "id",
          name: "name",
        });

        return request(app)
          .post("/users")
          .send({ name: "name" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(201, {
            id: "id",
            name: "name",
          });
      });

      it("should return 500 status code if an error occurs", async () => {
        CreateUserUseCase.prototype.execute = jest
          .fn()
          .mockRejectedValue(new Error("error"));

        return request(app)
          .post("/users")
          .send({ name: "name" })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(500)
          .expect((response) => {
            expect(response.body).toHaveProperty("error");
          });
      });
    });
  });
});
