import { Client } from '../entities/client';
import type { ClientRepository } from '../repositories/client-repository';

interface CreateClientInput {
  enterprise: string | null;
  cnpj: string | null;
  competenceMonth: string | null;
  product: string | null;
  contestation: string | null;
  returned: string | null;
}

export class CreateClientUseCase {
  constructor(private repository: ClientRepository) {}

  async execute(input: CreateClientInput): Promise<void> {
    const client = new Client(
      undefined,
      input.enterprise,
      input.cnpj,
      input.competenceMonth,
      input.product,
      input.contestation,
      input.returned
    );

    console.log(client)

    await this.repository.create(client);
  }
}
