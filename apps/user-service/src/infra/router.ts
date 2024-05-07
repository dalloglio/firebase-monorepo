import { Express, Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import { CreateUserUseCase } from "../application/create-user";
import { UserController } from "./controller";
import { FirestoreUserRepository } from "./repository";

export class UserRouter {
  static route(app: Express): void {
    app.post("/users", (req: Request, res: Response) => {
      const repository = new FirestoreUserRepository(getFirestore());
      const useCase = new CreateUserUseCase(repository);
      const controller = new UserController(useCase);
      return controller.createUser(req, res);
    });
  }
}
