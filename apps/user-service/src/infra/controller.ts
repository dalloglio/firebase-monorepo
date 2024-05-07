import { Request, Response } from "express";
import { CreateUserUseCase } from "../application/create-user";

export class UserController {
  constructor(private readonly useCase: CreateUserUseCase) {}

  async createUser(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const user = await this.useCase.execute({ name });
      return res.status(201).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }
}
