import { beforeEach, describe, expect, it } from 'vitest';
import { Client } from '../../domain/entities/Client';
import { InMemoryClientRepository } from '../../domain/repositories/memory/InMemoryClientRepostory';

describe('update client', () => {
  let repository: InMemoryClientRepository;

  beforeEach(() => {
    repository = new InMemoryClientRepository();
  });

  it('shoud be able update a client', async () => {
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

    await repository.create(client);

    const updatedClientData = { enterprise: 'Enterprise Exemplo 2' };
    const response = await repository.update('1', updatedClientData);

    expect(response).not.toBeNull();
    if (response) {
      expect(response.enterprise).toEqual(updatedClientData.enterprise);
    }
  });
});
