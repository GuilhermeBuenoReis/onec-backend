import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryClientRepository } from '../../domain/repositories/memory/InMemoryClientRepostory';
import { Client } from '../../domain/entities/Client';

describe('select client', () => {
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
  });

  it('shoud be able selects all clients', async () => {
    const clientData = {
      id: '1',
      enterprise: 'Enterprise Exemplo',
      cnpj: '00.000.000/0000-00',
      competenceMonth: '2023-10',
      product: 'Product Exemplo',
      contestation: 'Contestation Exemplo',
      returned: 'Returned Exemplo',
    };

    const client = new Client(
      clientData.id,
      clientData.enterprise,
      clientData.cnpj,
      clientData.competenceMonth,
      clientData.product,
      clientData.contestation,
      clientData.returned
    );

    const response = await repository.create(client);

    expect(response).toEqual(client);
  });
});
