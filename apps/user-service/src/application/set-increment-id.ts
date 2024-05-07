import { UserRepository } from "../domain/repository";

export interface SetIncrementIdInput {
  id: string;
  incrementId: number;
}

export class SetIncrementIdUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(input: SetIncrementIdInput): Promise<void> {
    const { id, incrementId } = input;
    const exists = await this.userRepository.exists(id);
    if (!exists) throw new Error("User not found");
    await this.userRepository.setIncrementId(id, incrementId);
  }
}
