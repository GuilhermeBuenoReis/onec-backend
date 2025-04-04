import { beforeEach, describe, expect, it } from 'vitest';
import { InMemoryContractRepository } from '../../domain/repositories/memory/inMemoryContractRepository';
import { Contract } from '../../domain/entities/Contract';
import { InMemoryStatusRepository } from '../../domain/repositories/memory/InMemoryStatusRepository';

describe('select contracs', () => {
  let repository: InMemoryContractRepository;
  let statusRepository: InMemoryStatusRepository;

  beforeEach(() => {
    repository = new InMemoryContractRepository();
    statusRepository = new InMemoryStatusRepository();
  });

  it('shoud be able selects all contracts', async () => {
    const status = statusRepository.create({
      id: '123',
      type: 'Ativo',
      count: 2,
    });

    const contractData = {
      id: '2',
      city: 'Cidade Exemplo',
      client: 'Cliente Exemplo',
      state: 'Estado Exemplo',
      cnpj: '00.000.000/0000-00',
      sindic: 'Sindic Exemplo',
      year: '2025',
      matter: 'Matéria Exemplo',
      forecast: 'Previsão Exemplo',
      contractTotal: '10000',
      percentage: 15,
      signedContract: new Date().toISOString(),
      statusId: 'Status exempo',
      averageGuide: 500,
      partner: 'Parceiro Exemplo',
      partnerCommission: 5,
      counter: '1',
      email: 'email@exemplo.com',
    };

    const contract1 = new Contract(
      contractData.id,
      contractData.city,
      contractData.client,
      contractData.state,
      contractData.cnpj,
      contractData.sindic,
      contractData.year,
      contractData.matter,
      contractData.forecast,
      contractData.contractTotal,
      contractData.percentage,
      contractData.signedContract,
      contractData.statusId,
      contractData.averageGuide,
      contractData.partner,
      contractData.partnerCommission,
      contractData.counter,
      contractData.email
    );
    const contract2 = new Contract(
      contractData.id,
      contractData.city,
      contractData.client,
      contractData.state,
      contractData.cnpj,
      contractData.sindic,
      contractData.year,
      contractData.matter,
      contractData.forecast,
      contractData.contractTotal,
      contractData.percentage,
      contractData.signedContract,
      contractData.statusId,
      contractData.averageGuide,
      contractData.partner,
      contractData.partnerCommission,
      contractData.counter,
      contractData.email
    );

    await repository.create(contract1);
    await repository.create(contract2);

    const result = await repository.select();

    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([contract1, contract2]));
  });
});
