import { UserFactory } from "../domain/factory";
import { UserRepository } from "../domain/repository";

export interface CreateUserInput {
  name: string;
}

export interface CreateUserOutput {
  id: string;
  name: string;
}

export class CreateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const { name } = input;
    const userCreated = await this.userRepository.save(
      UserFactory.create(name)
    );
    return {
      id: userCreated.id,
      name: userCreated.name,
    };
  }
}
