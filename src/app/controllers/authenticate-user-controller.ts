import { AuthenticateUserUseCase } from '@/core/use-cases/authentication-use-case.js';
import { DrizzleUserRepository } from '@/infra/db/repositories/drizzle-user-repository.js';

interface AuthenticateUserControllerInput {
  email: string;
  password: string;
}

export async function authenticateUserController({
  email,
  password,
}: AuthenticateUserControllerInput) {
  const userRepository = new DrizzleUserRepository();
  const useCase = new AuthenticateUserUseCase(userRepository);

  return await useCase.execute({ email, password });
}
