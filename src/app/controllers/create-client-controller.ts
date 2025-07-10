import { DrizzleClientRepository } from '@/infra/db/repositories/drizzle-client-repository';
import { CreateClientUseCase } from '@/core/use-cases/create-client';

interface CreateClientControllerInput {
  enterprise: string | null;
  cnpj: string | null;
  competenceMonth: string | null;
  product: string | null;
  contestation: string | null;
  returned: string | null;
}

export async function createClientController(input: CreateClientControllerInput) {
  const repository = new DrizzleClientRepository();
  const useCase = new CreateClientUseCase(repository);

  await useCase.execute(input);
  console.log('INPUT CLIENTE >>>', input);
}
